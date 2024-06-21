"use client";

import { resetPasswordAction } from "@/actions/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuAlertTriangle } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

type ResetPasswordFormData = {
  password: string;
};

export default function PasswordForm({ token }: { token: string }) {
  const [eyeToggle, setEyeToggle] = useState(false);
  const [type, setType] = useState(true);

  const { register, handleSubmit, formState, clearErrors, setError } =
    useForm<ResetPasswordFormData>();
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (
    formData,
  ): Promise<void> => {
    try {
      const response = await resetPasswordAction(token, formData.password);

      if (response?.error) {
        setError("root.random", {
          type: "random",
          message: response?.error,
        });
      } else if (response?.success) {
        setError("root.reset", {
          type: "reset",
          message: response?.success,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root.random", {
          type: "random",
          message: error.message,
        });
      } else {
        setError("root.random", {
          type: "random",
          message: "An unknown error occurred",
        });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(onSubmit)(e);
      }}
      autoComplete="off"
      className="mb-8 flex w-full max-w-[350px] flex-col justify-center gap-8">
      <div>
        <div className="mb-2">
          {errors?.root?.random?.type === "random" && (
            <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
              <LuAlertTriangle />
              <span>{errors?.root?.random?.message}</span>
            </span>
          )}

          {errors?.root?.reset?.type === "reset" && (
            <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-green-100 py-2 pl-2 text-green-600">
              <IoIosCheckmarkCircleOutline />
              <span>{errors?.root?.reset?.message}</span>
            </span>
          )}
        </div>

        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required field",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
                message: "Enter strong password",
              },
            })}
            type={type ? "password" : "text"}
            className="input-box"
            placeholder="Enter your new password"
          />

          <span
            className="absolute right-5 top-4 cursor-pointer text-gray-600"
            onClick={() => {
              setEyeToggle(!eyeToggle);
              setType(!type);
            }}
            aria-hidden="true">
            {eyeToggle ? <VscEyeClosed /> : <VscEye />}
          </span>
        </div>

        {errors.password && (
          <div className="mt-1 flex items-center gap-1 text-red-500">
            <IoAlertCircleOutline />
            {errors?.password?.message}
          </div>
        )}
      </div>

      <button disabled={isSubmitting} type="submit" className="submit-button">
        {isSubmitting ? "Loading..." : "Reset Password"}
      </button>
    </form>
  );
}
