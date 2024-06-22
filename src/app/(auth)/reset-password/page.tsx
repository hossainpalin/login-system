import BackToHome from "@/components/BackToHome";
import PasswordForm from "@/components/auth/PasswordForm";
import { getResetTokenByToken } from "@/database/queries/reset-token";
import Link from "next/link";
import { notFound } from "next/navigation";

type myParamsProps = {
  searchParams: {
    token: string;
  };
};

export function metadata() {
  return {
    title: "Reset Password",
    description: "Reset password page for your website.",
  };
}

export default async function ResetPasswordPage({
  searchParams: { token },
}: myParamsProps) {
  const isTokenValid = await getResetTokenByToken(token);

  if (!isTokenValid) notFound();

  return (
    <div className="flex w-full max-w-lg flex-col items-center overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-8 w-full">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">
            Reset Password
          </h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Enter your new password below.
        </p>
      </div>
      <PasswordForm token={token} />

      <Link className="text-gray-700 hover:underline" href="/login">
        Back to login
      </Link>
    </div>
  );
}
