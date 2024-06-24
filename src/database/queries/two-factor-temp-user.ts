import { TwoFactorTempUserModel } from "@/models/two-factor-temp-user";
import connectMongoDB from "@/services/mongo";
import bcrypt from "bcrypt";

// Generate two factor temp user token
export async function generateTwoFactorTempUserToken(
  email: string,
  password: string,
) {
  try {
    await connectMongoDB();

    const token = crypto.randomUUID().toString();
    const expirationDate = new Date(new Date().getTime() + 60 * 1000);

    const existingToken = await getTwoFactorTempUserTokenByEmail(email);

    if (existingToken) {
      await TwoFactorTempUserModel.deleteOne({ _id: existingToken?._id });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const twoFactorTempUserToken = await TwoFactorTempUserModel.create({
      email,
      password: hashedPassword,
      token,
      expirationDate,
    });

    return twoFactorTempUserToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two factor temp user token by email
export async function getTwoFactorTempUserTokenByEmail(email: string) {
  try {
    await connectMongoDB();
    const twoFactorTempUserToken = await TwoFactorTempUserModel.findOne({
      email,
    });
    return twoFactorTempUserToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get two factor temp user token by token
export async function getTwoFactorTempUserTokenByToken(token: string) {
  try {
    await connectMongoDB();
    const twoFactorTempUserToken = await TwoFactorTempUserModel.findOne({
      token,
    });
    return twoFactorTempUserToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
