import BackToHome from "@/components/BackToHome";
import EmailForm from "@/components/auth/EmailForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-8 w-full">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">
            Forgot Password
          </h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>
      <EmailForm />

      <Link className="text-gray-700 hover:underline" href="/login">
        Back to login
      </Link>
    </div>
  );
}
