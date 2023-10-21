import type { Metadata } from "next";
import MainNavigation from "../../components/shared-components/navigation/main-navigation";

export const metadata: Metadata = {
  title: "unifunds | landing page",
  description: "unifunds is a scholarship funding website",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main lang="en">
      <MainNavigation />
      {children}
    </main>
  );
}
