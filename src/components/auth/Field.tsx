import React from "react";
import { FieldError } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";

type FieldProps = {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: FieldError;
};

export default function Field({ label, children, htmlFor, error }: FieldProps) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className="mb-2 block text-gray-600">
          {label}
        </label>
      )}
      {children}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-red-500">
          <IoAlertCircleOutline />
          {error.message}
        </div>
      )}
    </div>
  );
}
