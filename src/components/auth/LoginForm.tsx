"use client";

import { loginAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Field from "./Field";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [eyeToggle, setEyeToggle] = useState<boolean | undefined>(false);
  const [type, setType] = useState<boolean | undefined>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setError,
    resetField,
  } = useForm<LoginFormProps>();
  const { isSubmitting, errors } = formState;

  const submitLoginForm: SubmitHandler<LoginFormProps> = async (
    formData,
  ): Promise<void> => {
    try {
      const response = await loginAction(formData);

      if (response.error) {
        setError("root.auth", {
          type: "auth",
          message: response.error,
        });

        resetField("email");
        resetField("password");
      } else if (response.twoFactor) {
        router.push(`/two-factor?token=${response?.token}`);
      } else {
        router.push("/dashboard");
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
        handleSubmit(submitLoginForm)(e);
      }}
      autoComplete="off">
      {errors?.root?.auth?.type === "auth" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors?.root?.auth?.message}</span>
        </span>
      )}

      {errors?.root?.random?.type === "random" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors?.root?.random?.message}</span>
        </span>
      )}

      <div className="space-y-2">
        <Field error={errors.email} label="Email address">
          <input
            {...register("email", {
              required: "Email address is required field",
            })}
            type="email"
            name="email"
            id="email"
            className={`input-box ${cn(errors.email ? "border-red-500" : "")}`}
            placeholder="john.doe@gmail.com"
          />
        </Field>
        <Field error={errors.password} label="Password">
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required field",
              })}
              type={type ? "password" : "text"}
              name="password"
              id="password"
              className={`input-box ${cn(errors.email ? "border-red-500" : "")}`}
              placeholder="*******"
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
        </Field>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary cursor-pointer rounded-sm focus:ring-0"
          />
          <label
            htmlFor="remember"
            className="ml-2 cursor-pointer text-gray-600">
            Remember me
          </label>
        </div>
        <Link href="/forgot-password" className="text-gray-700 underline">
          Forgot password
        </Link>
      </div>

      <div className="mt-4">
        <button disabled={isSubmitting} type="submit" className="submit-button">
          {isSubmitting ? "Logging..." : "Login"}
        </button>
      </div>
    </form>
  );
}
