"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Field from "./Field";

interface TwoFactorFormProps {
  twoFactor: string;
}

export default function TwoFactorForm() {
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setError,
    resetField,
  } = useForm<TwoFactorFormProps>();
  const { isSubmitting, errors } = formState;

  const submitTwoFactorForm: SubmitHandler<TwoFactorFormProps> = async (
    formData,
  ) => {};

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(submitTwoFactorForm)(e);
      }}>
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
