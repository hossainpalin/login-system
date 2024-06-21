"use client";

import { verifyEmailAction } from "@/actions/auth";
import { useCallback, useEffect, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuAlertTriangle } from "react-icons/lu";
import { BeatLoader } from "react-spinners";

export default function VerificationForm({ token }: { token: string }) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    verifyEmailAction(token)
      .then((response) => {
        setSuccess(response.success);
        setError(response.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="mb-8 text-center">
      {!error && !success && (
        <p className="py-1">
          <BeatLoader size={20} color="#2168cb" />
        </p>
      )}
      {error && (
        <p className="text-md flex items-center gap-2 rounded-md bg-red-100 px-2 py-2 text-red-600">
          <span>
            <LuAlertTriangle />
          </span>
          <span>{error}</span>
        </p>
      )}
      {success && (
        <p className="text-md flex items-center gap-2 rounded-md bg-green-100 px-2 py-2 text-green-600">
          <span>
            <IoIosCheckmarkCircleOutline />
          </span>
          <span>{success}</span>
        </p>
      )}
    </div>
  );
}
