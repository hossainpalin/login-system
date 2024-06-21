import BackToHome from "@/components/BackToHome";
import PasswordForm from "@/components/auth/PasswordForm";
import Link from "next/link";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const token = searchParams.token;
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
