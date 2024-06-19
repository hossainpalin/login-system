import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <div className="my-16 text-center">
        <h1 className="mb-2 text-4xl text-slate-200">Next.js Login System</h1>
        <p className="font-light text-slate-400">
          This is a simple login system built with Next.js, TypeScript, MongoDB,
          Next-Auth and Tailwind CSS.
        </p>
      </div>
      <Navbar />
    </div>
  );
}
