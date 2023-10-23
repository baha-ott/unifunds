import DashboardHeader from "@/components/pages/dashboard/navigation/dashboard-navigation";

export default function DashboardLayout({
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
