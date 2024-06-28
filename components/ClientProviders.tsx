"use client";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 2000 }}
      />
      {children}
    </>
  );
}
