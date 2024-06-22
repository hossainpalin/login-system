import Link from "next/link";

export function metadata() {
  return {
    title: "404: Page Not Found",
    description: "Not found page for your website.",
  };
}

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-blue-700 lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Something&apos;s missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore
          on the home page.{" "}
        </p>
        <Link
          href="/"
          className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
