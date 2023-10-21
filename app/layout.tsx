import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

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
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
