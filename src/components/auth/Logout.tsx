"use client";

import { signOut } from "next-auth/react";

export default function Logout({ isNav }: { isNav: boolean }) {
  return (
    <span
      onClick={() => signOut({ callbackUrl: "/" })}
      className={isNav ? "navbar" : "submit-button"}>
      Log out
    </span>
  );
}
