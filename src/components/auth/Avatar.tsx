"use client";

import { updateAvatarAction } from "@/actions/avatar";
import Image from "next/image";
import * as React from "react";
import { useRef, useState } from "react";

interface AvatarProps {
  userName: string | null | undefined;
  userAvatar: string | null | undefined;
  userId: string | null | undefined;
}

export default function Avatar({ userName, userAvatar, userId }: AvatarProps) {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const avatarUploadRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarUpload = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (avatarUploadRef.current) {
      avatarUploadRef.current.addEventListener("change", updateAvatar);
      avatarUploadRef.current.click();
    }
  };

  const updateAvatar = async (e: Event): Promise<void> => {
    const target = e.target as HTMLInputElement;
    const formData = new FormData();

    if (target && target.files) {
      const avatar = target.files[0];
      formData.append("image", avatar);
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=6d98024b636642e855954bf456da327d",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (response.status === 200) {
        const data = await response.json();

        if (userId !== null && userId !== undefined) {
          await updateAvatarAction(userId, data.data.url);
        }
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-primary relative mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full text-6xl font-semibold text-white">
          <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-[3px] border-gray-700 bg-blue-600">
            {userAvatar ? (
              loading ? (
                <Image
                  src="/loading.gif"
                  alt="loading"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                  unoptimized={true}
                />
              ) : (
                <Image
                  className="h-full w-full object-cover"
                  src={userAvatar}
                  alt={userName || "User Avatar"}
                  width={150}
                  height={150}
                  priority={true}
                />
              )
            ) : loading ? (
              <Image
                src="/loading.gif"
                alt="loading"
                width={50}
                height={50}
                className="h-full w-full object-cover"
                unoptimized={true}
              />
            ) : (
              <p>{userName?.charAt(0)?.toUpperCase()}</p>
            )}
          </div>

          <form onSubmit={handleAvatarUpload}>
            <button
              type="submit"
              className="absolute bottom-4 right-[-3px] flex h-7 w-7 items-center justify-center rounded-full bg-black/50 hover:bg-black/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6 p-1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <input
              ref={avatarUploadRef}
              type="file"
              id="file"
              hidden
              accept="image/*"
            />
          </form>
        </div>
      </div>
    </>
  );
}
