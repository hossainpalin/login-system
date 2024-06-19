import Link from "next/link";

export default function Navbar() {
  return (
    <ul className="flex gap-5">
      <li>
        <Link
          className="rounded-md bg-slate-400 px-3 py-1 hover:bg-slate-500"
          href="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          className="rounded-md bg-slate-400 px-3 py-1 hover:bg-slate-500"
          href="/login">
          Login
        </Link>
      </li>
      <li>
        <Link
          className="rounded-md bg-slate-400 px-3 py-1 hover:bg-slate-500"
          href="/register">
          Register
        </Link>
      </li>
    </ul>
  );
}
