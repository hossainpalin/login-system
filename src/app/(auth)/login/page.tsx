import BackToHome from "@/components/BackToHome";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

export function metadata() {
  return {
    title: "Login System - Login Page",
    description: "This is the login page of the login system.",
  };
}

export default async function LoginPage() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-1 flex items-center gap-2">
        <BackToHome />
        <h2 className="mb-1 text-2xl font-medium text-gray-700">Login</h2>
      </div>
      <p className="text-md mb-6 text-gray-600">Login to your account.</p>

      <LoginForm />

      <div className="relative mt-6 flex justify-center">
        <div className="relative z-10 bg-white px-3 uppercase text-gray-600">
          Or login with
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>

      <SocialLogin />

      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have account?{" "}
        <Link href="register" className="text-slate-700 underline">
          Register now
        </Link>
      </p>
    </div>
  );
}
