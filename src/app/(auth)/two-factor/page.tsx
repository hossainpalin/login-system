import BackToHome from "@/components/BackToHome";
import TwoFactorForm from "@/components/auth/TwoFactorForm";
import { getTwoFactorConfirmationTokenByToken } from "@/database/queries/two-factor-confirmation";
import { notFound } from "next/navigation";

type myParamsProps = {
  searchParams: {
    token: string;
  };
};

export default async function TwoFactorPage({
  searchParams: { token },
}: myParamsProps) {
  const existingConfirmation =
    await getTwoFactorConfirmationTokenByToken(token);

  if (!existingConfirmation) notFound();

  return (
    <div className="w-full max-w-lg overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-1 flex items-center gap-2">
        <BackToHome />
        <h2 className="mb-1 text-2xl font-medium text-gray-700">
          Verify Your Identity
        </h2>
      </div>
      <p className="text-md mb-6 text-gray-600">
        Two factor code sent to your email address.
      </p>

      <TwoFactorForm
        email={existingConfirmation?.email}
        password={existingConfirmation?.password}
      />
    </div>
  );
}
