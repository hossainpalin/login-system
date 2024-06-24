import { TwoFactorConfirmationModel } from "@/models/two-factor-confirmation-model.ts";
import connectMongoDB from "@/services/mongo";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    await connectMongoDB();
    const twoFactorConfirmation = await TwoFactorConfirmationModel.findOne({
      userId,
    });
    return twoFactorConfirmation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
