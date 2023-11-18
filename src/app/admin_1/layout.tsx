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
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
        <AdminNav />
      </div>
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
