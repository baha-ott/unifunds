
import {
  createMiddlewareClient,
} from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { doesURLincludeValidPath } from "../src/lib/helpers";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.url;

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && String(pathname).includes("dashboard")) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
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
        NextResponse.redirect(new URL("/dashboard/student", req.url));
      }
    }
  }

  return res;
}
