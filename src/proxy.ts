import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/", "/login", "/register", "/api/auth", "/system",
  "/shinehealthcare", "/portal/wishes",
  "/portal/furbitte", "/portal/charta", "/portal/welcome-origin",
];

const ROLE_ROUTES: Record<string, string[]> = {
  SUPER_ADMIN: ["/admin"],
  TENANT_ADMIN: ["/admin/tenant"],
  PARENT: ["/portal/guardian"],
  JUNIOR: ["/portal/junior"],
  PILGRIM: ["/portal"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const session = await auth();
  const user = session?.user as any;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role: string = user.role ?? "PILGRIM";

  // JUNIOR can never access admin or guardian routes
  if (role === "JUNIOR" && (pathname.startsWith("/admin") || pathname.startsWith("/portal/guardian"))) {
    return NextResponse.redirect(new URL("/portal/junior", request.url));
  }

  // Only SUPER_ADMIN can access /admin (top level)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/tenant")) {
    if (role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  // Tenant admin routes
  if (pathname.startsWith("/admin/tenant")) {
    if (!["SUPER_ADMIN", "TENANT_ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
    // Tenant admin can only access their own tenant
    if (role === "TENANT_ADMIN") {
      const tenantSlug = pathname.split("/")[3];
      if (tenantSlug && tenantSlug !== user.tenantSlug) {
        return NextResponse.redirect(new URL(`/admin/tenant/${user.tenantSlug}`, request.url));
      }
    }
  }

  // Parent-only routes
  if (pathname.startsWith("/portal/guardian") && role !== "PARENT" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
