import Avatar from "@/components/auth/Avatar";
import BackToHome from "@/components/auth/BackToHome";

export function metadata() {
  return {
    title: "Login System - Dashboard Page",
    description: "This is the dashboard page of the login system.",
  };
}

export default function DashboardPage() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-8 w-full">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">Dashboard</h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Welcome back, Hossain Muhammad Palin
        </p>
      </div>

      <Avatar />
    </div>
  );
}
