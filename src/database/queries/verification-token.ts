import { VerificationTokensModel } from "@/models/verification-token-model";
import connectMongoDB from "@/services/mongo";

// Generate verification token
export async function generateVerificationToken(email: string) {
  try {
    await connectMongoDB();

    const token = crypto.randomUUID().toString();
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await VerificationTokensModel.deleteOne({ _id: existingToken?._id });
    }

    const verificationToken = await VerificationTokensModel.create({
      email,
      token,
      expirationDate,
    });

    return verificationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get verification token by email
export async function getVerificationTokenByEmail(email: string) {
  try {
    await connectMongoDB();
    const verificationToken = await VerificationTokensModel.findOne({ email });
    return verificationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

// Get verification token by token
export async function getVerificationTokenByToken(token: string) {
  try {
    await connectMongoDB();
    const verificationToken = await VerificationTokensModel.findOne({ token });
    return verificationToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
