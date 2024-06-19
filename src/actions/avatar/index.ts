"use server";

import { updateAvatar } from "@/database/queries/avatar";
import { revalidatePath } from "next/cache";

export async function updateAvatarAction(userId, avatar) {
  try {
    await updateAvatar(userId, avatar);
  } catch (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
