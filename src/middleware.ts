import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";

export function middleware(request: NextRequest) {
  if (env.NODE_ENV !== "development") {
    console.log("Blocking request to: " + request.nextUrl.pathname);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
