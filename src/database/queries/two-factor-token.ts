import { TwoFactorTokensModel } from "@/models/two-factor-token-model";
import connectMongoDB from "@/services/mongo";
import crypto from "crypto";

// Generate a two-factor token for a user
export async function generateTwoFactorToken(email: string) {
  try {
    await connectMongoDB();

    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expirationDate = new Date(new Date().getTime() + 60 * 1000);
    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await TwoFactorTokensModel.deleteOne({ _id: existingToken?._id });
    }

    const twoFactorToken = await TwoFactorTokensModel.create({
      email,
      token,
      expirationDate,
    });

    return twoFactorToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two-factor token by email
export async function getTwoFactorTokenByEmail(email: string) {
  try {
    await connectMongoDB();
    const twoFactorToken = await TwoFactorTokensModel.findOne({ email });
    return twoFactorToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two-factor token by token
export async function getTwoFactorTokenByToken(token: string) {
  try {
    await connectMongoDB();
    const twoFactorToken = await TwoFactorTokensModel.findOne({ token });
    return twoFactorToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
