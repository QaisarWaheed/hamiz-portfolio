import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in · CMS",
  description: "Hamiz Khan portfolio — admin",
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
