import { auth } from "@/auth";
import Avatar from "@/components/auth/Avatar";
import EnableTwoFactor from "@/components/auth/EnableTwoFactor";
import Logout from "@/components/auth/Logout";
import BackToHome from "@/components/BackToHome";
import { getUserByEmail } from "@/database/queries/user";

export function metadata() {
  return {
    title: "Login System - Dashboard Page",
    description: "This is the dashboard page of the login system.",
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <div className="flex w-full max-w-lg flex-col items-center overflow-hidden rounded bg-white px-6 py-7 shadow">
      <div className="mb-8 w-full">
        <div className="mb-1 flex items-center gap-2">
          <BackToHome />
          <h2 className="mb-1 text-2xl font-medium text-gray-700">Dashboard</h2>
        </div>
        <p className="text-md mb-6 text-gray-600">
          Welcome back, {session?.user?.name}!
        </p>
      </div>

      <Avatar
        userName={session?.user?.name}
        userAvatar={user?.image}
        userId={session?.user?.id}
      />

      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-700 lg:text-[28px]">
          {session?.user?.name ? session?.user?.name : "No name found"}
        </h3>
        <p className="leading-[231%] text-gray-600 lg:text-lg">
          {session?.user?.email
            ? session?.user?.email
            : "No email address found"}
        </p>
      </div>

      <EnableTwoFactor
        isTwoFactorEnabled={user?.isTwoFactorEnabled}
        email={user?.email}
      />

      <Logout isNav={false} />
    </div>
  );
}
