"use server";

import { signIn } from "@/auth";
import {
  generateResetToken,
  getResetTokenByToken,
} from "@/database/queries/reset-token";
import { generateTwoFactorConfirmationToken } from "@/database/queries/two-factor-confirmation";
import {
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "@/database/queries/two-factor-token";
import { getUserByEmail } from "@/database/queries/user";
import {
  generateVerificationToken,
  getVerificationTokenByToken,
} from "@/database/queries/verification-token";
import {
  sendResetEmail,
  sendTwoFactorToken,
  sendVerificationEmail,
} from "@/lib/email";
import { ResetTokensModel } from "@/models/reset-token-model";
import { TwoFactorConfirmationModel } from "@/models/two-factor-confirmation-model";
import { TwoFactorTokensModel } from "@/models/two-factor-token-model";
import { UsersModel } from "@/models/user-model";
import { VerificationTokensModel } from "@/models/verification-token-model";
import connectMongoDB from "@/services/mongo";
import bcrypt from "bcrypt";

type userProps = {
  email: string;
  password: string;
  twoFactor?: string;
};

// User login action
export async function loginAction(formData: userProps) {
  const existingUser = await getUserByEmail(formData?.email);

  // Check if the user exists and email is verified or not
  if (existingUser && !existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser?.email,
    );
    await sendVerificationEmail(existingUser?.email, verificationToken?.token);
    return { error: "Please verify your email address!" };
  }

  // Check if the user exists and two factor is enabled or not
  if (existingUser?.email && existingUser?.isTwoFactorEnabled) {
    // Check if the user exists and password is correct or not
    await connectMongoDB();
    const user = await UsersModel.findOne({ email: existingUser?.email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        formData?.password as string,
        user?.password as string,
      );

      if (!isPasswordMatch) {
        return { error: "Invalid Password!" };
      }
    }

    if (formData?.twoFactor) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser?.email,
      );

      if (!twoFactorToken) {
        return { error: "Invalid two factor code!" };
      }

      if (twoFactorToken?.token !== formData?.twoFactor) {
        return { error: "Invalid two factor code!" };
      }

      const hasExpired = new Date(twoFactorToken?.expirationDate) < new Date();

      if (hasExpired) {
        return { error: "Two factor code has expired!" };
      }

      await connectMongoDB();
      await TwoFactorTokensModel.deleteOne({ _id: twoFactorToken?._id });
      await TwoFactorConfirmationModel.deleteOne({
        email: existingUser?.email,
      });
    } else {
      const twoFactorConfirmationToken =
        await generateTwoFactorConfirmationToken(
          formData?.email,
          formData?.password,
        );
      const twoFactorToken = await generateTwoFactorToken(existingUser?.email);
      await sendTwoFactorToken(existingUser?.email, twoFactorToken?.token);
      return { twoFactor: true, token: twoFactorConfirmationToken?.token };
    }
  }

  try {
    // Check if the user exists and password is correct or not
    await connectMongoDB();
    const user = await UsersModel.findOne({ email: existingUser?.email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        formData?.password as string,
        user?.password as string,
      );

      if (!isPasswordMatch) {
        return { error: "Invalid Password!" };
      }
    } else {
      return { error: "Invalid Email Address!" };
    }

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

// User email verification action
export async function verifyEmailAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken?.expirationDate) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken?.email);

  if (!existingUser) {
    return { error: "Email address not found!" };
  }

  try {
    await connectMongoDB();
    await UsersModel.findOneAndUpdate(
      { _id: existingUser?._id },
      { $set: { emailVerified: true, email: existingToken?.email } },
    );
    await VerificationTokensModel.deleteOne({ _id: existingToken._id });
    return { success: "Email verified successfully!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

// User forgot password reset link send action
export async function forgotPasswordAction(email: string) {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email address not found!" };
  }

  try {
    const resetPasswordToken = await generateResetToken(email);
    await sendResetEmail(resetPasswordToken?.email, resetPasswordToken?.token);

    return { success: "Reset email sent successfully!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

// User reset password action
export async function resetPasswordAction(token: string, password: string) {
  const existingToken = await getResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken?.expirationDate) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  try {
    await connectMongoDB();

    // Make hash of the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await UsersModel.findOneAndUpdate(
      { email: existingToken?.email },
      { $set: { password: hashedPassword } },
    );

    await ResetTokensModel.deleteOne({ _id: existingToken?._id });

    return { success: "Password reset successfully!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

// Enable two factor action
export async function enableTwoFactorAction(email: string, value: boolean) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    await connectMongoDB();
    await UsersModel.findOneAndUpdate(
      { email: existingUser?.email },
      { $set: { isTwoFactorEnabled: value } },
    );
  }
}
