"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/database/queries/user";
import {
  generateVerificationToken,
  getVerificationTokenByToken,
} from "@/database/queries/verification-token";
import { sendVerificationEmail } from "@/lib/email";
import { UsersModel } from "@/models/user-model";
import { VerificationTokensModel } from "@/models/verification-token-model";
import connectMongoDB from "@/services/mongo";
import { AuthError } from "next-auth";

type userProps = {
  email: string;
  password: string;
};

// User login action
export async function loginAction(formData: userProps) {
  const existingUser = await getUserByEmail(formData?.email);

  // Check if the user exists and email is verified or not
  if (existingUser && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser?.email,
    );
    await sendVerificationEmail(existingUser?.email, verificationToken?.token);
    return { error: "Please verify your email address!" };
  }

  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid email or password!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
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
    throw new Error(error.message);
  }
}
