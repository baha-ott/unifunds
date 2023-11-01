import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { doesURLincludeValidPath } from "./lib/helpers";

export async function middleware(request: NextRequest) {
  const pathname = request.url;

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && String(pathname).includes("dashboard")) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (
    session &&
    pathname.includes("dashboard") &&
    !doesURLincludeValidPath(pathname, ["student", "provider"])
  ) {
    const { data } = await supabase.from("user").select("role");
    if (data) {
      const role = data[0].role;

      if (role === "student") {
        return NextResponse.redirect(
          new URL("/dashboard/student", request.url)
        );
      }
    }
  }
}
