import type { Metadata } from "next";
import AdminHeader from "./components/admin-header";
import AdminNav from "./components/admin-nav";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "unifunds | Admin",
  description: "unifunds is a scholarship funding website",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {children}
      <Toaster />
    </main>
  );
}
