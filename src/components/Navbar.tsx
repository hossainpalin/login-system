import Link from "next/link";

export default function Navbar() {
  return (
    <ul className="flex gap-5">
      <li>
        <Link className="navbar" href="/dashboard">
          Dashboard
        </Link>
      </li>
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
      <li>
        <span className="navbar" href="/register">
          Log out
        </span>
      </li>
    </ul>
  );
}
