import BackToHome from "@/components/BackToHome";
import VerificationForm from "@/components/auth/VerificationForm";
import { getVerificationTokenByToken } from "@/database/queries/verification-token";
import Link from "next/link";
import { notFound } from "next/navigation";

type myParamsProps = {
  searchParams: {
    token: string;
  };
};

export function metadata() {
  return {
    title: "Email Verification",
    description: "Email verification page for your website.",
  };
}

export default async function EmailVerificationPage({
  searchParams: { token },
}: myParamsProps) {
  const isTokenValid = await getVerificationTokenByToken(token);

  if (!isTokenValid) notFound();

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
