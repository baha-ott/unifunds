import DashboardHeader from "@/components/pages/dashboard/navigation/dashboard-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "unifunds student dashboard",
  description: "this is the dashboard for the student",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardHeader />
      {children}
    </main>
  );
}
