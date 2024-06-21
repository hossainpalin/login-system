import { generateVerificationToken } from "@/database/queries/verification-token";
import { sendVerificationEmail } from "@/lib/email";
import { UsersModel } from "@/models/user-model";
import connectMongoDB from "@/services/mongo";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, password, agreement } = await request.json();

  // Connect to the MongoDB
  await connectMongoDB();

  // Check if the user already exists
  const isUserExists = await UsersModel.findOne({ email });

  if (isUserExists) {
    return new NextResponse("User already exists", { status: 400 });
  }

  // Make hash of the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Make a new user
  const newUser = {
    name,
    email,
    password: hashedPassword,
    agreement,
  };

  try {
    // Save the user to the database
    await UsersModel.create(newUser);

    // Generate a verification token and send an email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken?.email,
      verificationToken?.token,
    );

    return new NextResponse("Confirmation email sent!", { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
