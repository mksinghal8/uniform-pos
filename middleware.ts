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
    const session = await decrypt(cookie);

    if (!session) {
        if (isAuthRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }

    if (session?.role === 'admin') {
        return NextResponse.next();
    }

    if (session?.role === 'sales' && isAdminRoute)
        return NextResponse.redirect(new URL('/sales/pos', req.nextUrl));

    return NextResponse.next();
}
