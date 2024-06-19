import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
