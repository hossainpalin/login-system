"use client";

import { signIn } from "next-auth/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const handleSocialAuth = async (provider: string): Promise<void> => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={() => handleSocialAuth("facebook")}
        className="flex w-1/2 items-center justify-center gap-3 rounded bg-blue-800 py-2 text-center text-sm font-medium text-white hover:bg-blue-700">
        <span>
          <FaFacebook className="h-4 w-4" />
        </span>
        Facebook
      </button>
      <button
        onClick={() => handleSocialAuth("google")}
        className="flex w-1/2 items-center justify-center gap-3 rounded bg-red-600 py-2 text-center text-sm font-medium text-white hover:bg-red-500">
        <span>
          <FaGoogle className="h-4 w-4" />
        </span>
        Google
      </button>
    </div>
  );
}
