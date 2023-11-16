import DashboardHeader from "@/app/dashboard/components/navigation/dashboard-navigation";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";


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
      <Toaster />
    </main>
  );
}
