"use client";

type errorProps = {
  error: {
    message: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: errorProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-2 text-xl text-white">{error.message}</h2>
        <button
          className="max-w-fit rounded-md bg-red-600 px-3 py-1 text-white"
          onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
