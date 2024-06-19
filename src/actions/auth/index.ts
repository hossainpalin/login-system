"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// User login action
export async function loginAction(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid password!" };
        case "CallbackRouteError":
          return { error: "Invalid email address!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}
