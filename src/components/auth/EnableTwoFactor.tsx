"use client";

import { enableTwoFactorAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function EnableTwoFactor({
  isTwoFactorEnabled,
  email,
}: {
  isTwoFactorEnabled: boolean;
  email: string;
}) {
  const [is2FAEnabled, setIs2FAEnabled] = useState<string | undefined>(
    isTwoFactorEnabled ? "enable" : "disable",
  );

  const handleEnable2FA = async (value: string) => {
    if (value === "enable") {
      setIs2FAEnabled("enable");
      await enableTwoFactorAction(email, true);
      alert("2FA enabled successfully!, Next login will require 2FA Code!");
    } else {
      setIs2FAEnabled("disable");
      await enableTwoFactorAction(email, false);
      alert("2FA disabled successfully!");
    }
  };

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-4">
      <h1 className="text-xl text-gray-700">
        Enable Two-Factor Authentication (2FA)
      </h1>
      <div className="flex gap-5">
        <button
          onClick={() => handleEnable2FA("enable")}
          className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 ${cn(is2FAEnabled === "enable" ? "bg-green-600 text-white hover:bg-green-700" : "")}`}>
          Enable
        </button>
        <button
          onClick={() => handleEnable2FA("disable")}
          className={`rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300 ${cn(is2FAEnabled === "disable" ? "bg-green-600 text-white hover:bg-green-700" : "")}`}>
          Disable
        </button>
      </div>
    </div>
  );
}
