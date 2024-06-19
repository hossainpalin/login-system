"use client";

import { loginAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Field from "./Field";

export default function LoginForm() {
  const [eyeToggle, setEyeToggle] = useState(false);
  const [type, setType] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, formState, clearErrors, setError } =
    useForm();
  const { isSubmitting, errors } = formState;

  const submitLoginForm = async (data) => {
    try {
      const response = await loginAction(data);

      if (response.error) {
        setError("auth", {
          type: "auth",
          message: response.error,
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("random", {
        type: "random",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(submitLoginForm)(e);
      }}
      autocomplete="off">
      {errors.auth?.type === "auth" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors.auth?.message}</span>
        </span>
      )}

      {errors.auth?.type === "random" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors.random?.message}</span>
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
          <label for="remember" className="ml-2 cursor-pointer text-gray-600">
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
