import { UsersModel } from "@/models/user-model";
import connectMongoDB from "@/services/mongo";

// Get user by email
export async function getUserByEmail(email: string) {
  await connectMongoDB();
  const user = await UsersModel.findOne({ email });
  return user;
}

// Get user by ID
export async function getUserById(id: string) {
  await connectMongoDB();
  const user = await UsersModel.findById(id);
  return user;
}
