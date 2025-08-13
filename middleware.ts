// In the root of your project: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const i18n = {
  locales: ["en", "ar"],
  defaultLocale: "en",
};

export function middleware(request: NextRequest) {
  // --- ADD THIS LOG ---
  console.log(`Middleware running for path: ${request.nextUrl.pathname}`);

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    console.log(`Redirecting to /${locale}${pathname}`); // <-- Add another log
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
