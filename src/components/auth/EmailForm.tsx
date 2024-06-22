"use client";

import { forgotPasswordAction } from "@/actions/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuAlertTriangle } from "react-icons/lu";

interface ForgotPasswordFormData {
  email: string;
}

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setError,
    resetField,
  } = useForm<ForgotPasswordFormData>();
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (
    formData,
  ): Promise<void> => {
    try {
      const response = await forgotPasswordAction(formData.email);

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
      resetField("email");
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

        <input
          {...register("email", { required: "Email is required field" })}
          type="email"
          className="input-box"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <div className="mt-1 flex items-center gap-1 text-red-500">
            <IoAlertCircleOutline />
            {errors?.email?.message}
          </div>
        )}
      </div>

      <button disabled={isSubmitting} type="submit" className="submit-button">
        {isSubmitting ? "Loading..." : "Send Reset Email"}
      </button>
    </form>
  );
}
