import { TwoFactorConfirmationModel } from "@/models/two-factor-confirmation-model";
import connectMongoDB from "@/services/mongo";
import { encryptTest } from "@/utils/encryptText";

// Generate two factor confirmation token
export async function generateTwoFactorConfirmationToken(
  email: string,
  password: string,
) {
  try {
    await connectMongoDB();

    const token = crypto.randomUUID().toString();
    const expirationDate = new Date(new Date().getTime() + 60 * 1000);
    const existingToken = await getTwoFactorConfirmationTokenByEmail(email);

    if (existingToken) {
      await TwoFactorConfirmationModel.deleteOne({ _id: existingToken?._id });
    }

    const encryptPassword = encryptTest(password, email);

    const twoFactorConfirmationToken = await TwoFactorConfirmationModel.create({
      email,
      password: encryptPassword,
      token,
      expirationDate,
    });

    return twoFactorConfirmationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two factor confirmation token by email
export async function getTwoFactorConfirmationTokenByEmail(email: string) {
  try {
    await connectMongoDB();
    const twoFactorConfirmationToken = await TwoFactorConfirmationModel.findOne(
      {
        email,
      },
    );
    return twoFactorConfirmationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two factor confirmation token by token
export async function getTwoFactorConfirmationTokenByToken(token: string) {
  try {
    await connectMongoDB();
    const twoFactorConfirmationToken = await TwoFactorConfirmationModel.findOne(
      {
        token,
      },
    );
    return twoFactorConfirmationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
