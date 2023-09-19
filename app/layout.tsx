import MainNavigation from "@/components/shared-components/navigation/main-navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unifunds",
  description: "unifunds is a scholarship funding website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavigation />
        {children}
      </body>
    </html>
  );
}
