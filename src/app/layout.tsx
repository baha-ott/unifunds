import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { UserProvider } from "./dashboard/provider/UserProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unifunds",
  description: "unifunds is a scholarship funding website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("user").select("*");

  if (data && data.length > 0) {
    const { role } = data[0];
    return (
      <html lang="en">
        <body className={`${roboto.className} overflow-x-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider value={{ role }}>{children}</UserProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={`${roboto.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
