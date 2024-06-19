import { UsersModel } from "@/models/user-model";
import connectMongoDB from "@/services/mongo";

export async function getUserByEmail(email) {
  await connectMongoDB();
  const user = await UsersModel.findOne({ email });
  return user;
}
