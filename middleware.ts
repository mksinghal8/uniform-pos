import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/(auth)/_auth/session";

const adminRoutes = ['/admin/dashboard'];
const authRoutes = ['/signin', '/signup'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isAdminRoute = adminRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    // Allow requests for static assets
    if (path.startsWith('/_next/static') || path.startsWith('/favicon.ico')) {
        return NextResponse.next();
    }

    const cookie = req.cookies.get('session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    // No session, redirect if not accessing auth routes
    if (!session) {
        console.log("No session found");
        return isAuthRoute ? NextResponse.next() : NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    // Admin access
    if (session.role === 'admin') {
        console.log("Admin access granted");
        return NextResponse.next();
    }

    // Sales user accessing admin route
    if (session.role === 'sales' && isAdminRoute) {
        console.log("Sales user redirected from admin route");
        return NextResponse.redirect(new URL('/sales/pos', req.nextUrl));
    }

    console.log("Access granted for user");
    return NextResponse.next();
}
