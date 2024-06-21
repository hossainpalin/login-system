"use server";

import { updateAvatar } from "@/database/queries/avatar";
import { revalidatePath } from "next/cache";

export async function updateAvatarAction(userId: string, avatar: string) {
  try {
    await updateAvatar(userId, avatar);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }

  revalidatePath("/");
}
