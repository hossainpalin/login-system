"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function BackToHome() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="rounded-sm bg-gray-200 p-2 hover:bg-gray-300">
      <IoArrowBackOutline className="text-gray-700" />
    </button>
  );
}
