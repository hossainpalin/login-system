import BackToHome from "@/components/BackToHome";
import VerificationForm from "@/components/auth/VerificationForm";
import Link from "next/link";

type myParamsProps = {
  searchParams: {
    token: string;
  };
};

export default function EmailVerificationPage({
  searchParams: { token },
}: myParamsProps) {
  return (
    <div className="flex w-full max-w-lg flex-col items-center overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-8 w-full">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">
            Email Verification
          </h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Please wait while we verify your email address.
        </p>
      </div>

      <VerificationForm token={token} />

      <Link className="text-gray-700 hover:underline" href="/login">
        Back to login
      </Link>
    </div>
  );
}
