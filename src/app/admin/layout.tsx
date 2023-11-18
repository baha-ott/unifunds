import type { Metadata } from "next";
import AdminHeader from "./components/admin-header";

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
    <main>
      <AdminHeader />
      {children}
      <Toaster />
    </main>
  );
}
