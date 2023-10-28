import DashboardHeader from "@/components/pages/dashboard/navigation/dashboard-navigation";
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
