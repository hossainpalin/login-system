import BackToHome from "@/components/auth/BackToHome";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-lg overflow-hidden rounded bg-white px-6 py-7 shadow">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">Register</h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Please register to continue
        </p>
        <RegisterForm />

        <div className="relative mt-6 flex justify-center">
          <div className="relative z-10 bg-white px-3 uppercase text-gray-600">
            Or signup with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <SocialLogin />

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link href="login" className="text-gray-700 underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
