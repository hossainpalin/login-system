import { auth } from "@/auth";
import Link from "next/link";
import Logout from "./auth/Logout";

export default async function Navbar() {
  const session = await auth();
  return (
    <ul className="flex gap-5">
      <li>
        <Link className="navbar" href="/dashboard">
          Dashboard
        </Link>
      </li>
      {session?.user ? (
        <li>
          <Logout isNav={true} />
        </li>
      ) : (
        <>
          <li>
            <Link className="navbar" href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="navbar" href="/register">
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
