import { UsersModel } from "@/models/user-model";
import connectMongoDB from "@/services/mongo";

export async function updateAvatar(userId, avatar) {
  await connectMongoDB();
  const user = await UsersModel.findOne({ _id: userId });

  if (user) {
    await UsersModel.findOneAndUpdate(
      { _id: userId },
      { $set: { image: avatar } },
    );
  } else {
    throw new Error("User not found");
  }
}
