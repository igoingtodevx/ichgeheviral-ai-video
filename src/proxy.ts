import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { isClerkConfigured } from "./lib/auth";

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === "/kundenbereich" ||
    pathname.startsWith("/kundenbereich/") ||
    pathname === "/checkout/return" ||
    pathname === "/admin/overview" ||
    pathname.startsWith("/admin/overview/") ||
    pathname === "/admin/memberships" ||
    pathname.startsWith("/admin/memberships/")
  );
}

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedPath(req.nextUrl.pathname)) {
    await auth.protect();
  }
});

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured) return NextResponse.next();
  if (isProtectedPath(request.nextUrl.pathname) || request.nextUrl.pathname === "/__clerk" || request.nextUrl.pathname.startsWith("/__clerk/")) {
    return clerkHandler(request, event);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless they are explicitly requested.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|webp|ico|txt|xml|woff2?|ttf|otf|map|mp4|webm|avif|pdf|zip)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
