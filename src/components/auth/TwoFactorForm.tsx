"use client";

import { loginAction } from "@/actions/auth";
import { decryptText } from "@/utils/encryptText";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import Field from "./Field";

interface TwoFactorFormProps {
  twoFactor: string;
}

export default function TwoFactorForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setError,
    resetField,
  } = useForm<TwoFactorFormProps>();
  const { isSubmitting, errors } = formState;
  const router = useRouter();

  const submitTwoFactorForm: SubmitHandler<TwoFactorFormProps> = async (
    formData,
  ) => {
    const decryptedPassword = decryptText(password, email);
    const twoFactorUser = {
      email,
      password: decryptedPassword,
      twoFactor: formData?.twoFactor,
    };

    try {
      const response = await loginAction(twoFactorUser);

      if (response.error) {
        setError("root.twoFactor", {
          type: "twoFactor",
          message: response.error,
        });

        resetField("twoFactor");
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
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(submitTwoFactorForm)(e);
      }}>
      {errors?.root?.twoFactor?.type === "twoFactor" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors?.root?.twoFactor?.message}</span>
        </span>
      )}

      {errors?.root?.random?.type === "random" && (
        <span className="text-md mb-5 flex items-center gap-2 rounded-md bg-red-100 py-2 pl-2 text-red-600">
          <LuAlertTriangle />
          <span>{errors?.root?.random?.message}</span>
        </span>
      )}

      <Field error={errors.twoFactor} label="Two Factor Code">
        <input
          {...register("twoFactor", {
            required: "Two Factor Code is required field",
          })}
          type="text"
          name="twoFactor"
          id="twoFactor"
          className="input-box"
          placeholder="123456"
        />
      </Field>

      <div className="mt-4">
        <button disabled={isSubmitting} type="submit" className="submit-button">
          {isSubmitting ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </form>
  );
}
