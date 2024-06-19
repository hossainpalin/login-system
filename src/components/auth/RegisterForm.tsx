"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Field from "./Field";

export default function RegisterForm() {
  const [eyeTogglePass, setEyeTogglePass] = useState(false);
  const [typePass, setTypePass] = useState(true);
  const [eyeToggleCPass, setEyeToggleCPass] = useState(false);
  const [typeCPass, setTypeCPass] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, formState, setError, watch, clearErrors } =
    useForm();
  const { isSubmitting, errors } = formState;

  const submitRegisterForm = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      agreement: data.agreement,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 400) {
        setError("auth", {
          type: "auth",
          message: "User already exists",
        });
      } else if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      setError("auth", {
        type: "random",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(submitRegisterForm)(e);
      }}
      autocomplete="off">
      {errors.auth?.type === "auth" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors.auth.message}</span>
        </span>
      )}

      {errors.auth?.type === "random" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors.random.message}</span>
        </span>
      )}

      <div class="space-y-2">
        <Field error={errors.full_name} label="Full name">
          <input
            {...register("name", {
              required: "Full name is required field",
            })}
            type="text"
            name="name"
            id="name"
            className={`input-box ${cn(errors.email ? "border-red-500" : "")}`}
            placeholder="John Doe"
          />
        </Field>
        <Field error={errors.email} label="Email address">
          <input
            {...register("email", {
              required: "Email address is required field",
              pattern: {
                value: /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
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
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
                  message: "Enter strong password",
                },
              })}
              type={typePass ? "password" : "text"}
              name="password"
              id="password"
              className={`input-box ${cn(errors.email ? "border-red-500" : "")}`}
              placeholder="*******"
            />
            <span
              className="absolute right-5 top-4 cursor-pointer text-gray-600"
              onClick={() => {
                setEyeTogglePass(!eyeTogglePass);
                setTypePass(!typePass);
              }}
              aria-hidden="true">
              {eyeTogglePass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>
        </Field>
        <Field error={errors.confirmPassword} label="Confirm password">
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required field",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type={typeCPass ? "password" : "text"}
              name="confirmPassword"
              id="confirmPassword"
              className={`input-box ${cn(errors.email ? "border-red-500" : "")}`}
              placeholder="*******"
            />

            <span
              className="absolute right-5 top-4 cursor-pointer p-1 text-gray-600"
              onClick={() => {
                setEyeToggleCPass(!eyeToggleCPass);
                setTypeCPass(!typeCPass);
              }}
              aria-hidden="true">
              {eyeToggleCPass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>
        </Field>
      </div>
      <div className="mt-6">
        <Field error={errors.agreement}>
          <div className="flex items-center">
            <input
              {...register("agreement", {
                required: "Agreement is required field",
              })}
              type="checkbox"
              name="agreement"
              id="agreement"
              className="text-primary cursor-pointer rounded-sm focus:ring-0"
            />
            <label
              htmlFor="agreement"
              className="ml-2 cursor-pointer text-gray-600">
              I have read and agree to the{" "}
              <Link href="#" className="text-primary">
                terms & conditions
              </Link>
            </label>
          </div>
        </Field>
      </div>
      <div className="mt-4">
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}
