import { ResetTokensModel } from "@/models/reset-token-model";
import connectMongoDB from "@/services/mongo";

export async function generateResetToken(email: string) {
  try {
    await connectMongoDB();

    const token = crypto.randomUUID().toString();
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getResetTokenByEmail(email);

    if (existingToken) {
      await ResetTokensModel.deleteOne({ _id: existingToken?._id });
    }

    const resetToken = await ResetTokensModel.create({
      email,
      token,
      expirationDate,
    });

    return resetToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get reset token by email
export async function getResetTokenByEmail(email: string) {
  try {
    await connectMongoDB();
    const resetToken = await ResetTokensModel.findOne({ email });
    return resetToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get reset token by token
export async function getResetTokenByToken(token: string) {
  try {
    await connectMongoDB();
    const resetToken = await ResetTokensModel.findOne({ token });
    return resetToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
