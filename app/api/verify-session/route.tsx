import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '../../(auth)/_auth/session'; // Adjust the import path

export async function GET(req: NextRequest) {
    const session = await verifySession(); // Assuming verifySession can take a cookie
    if (!session?.role) {
        return NextResponse.json({ isAuth: false }, { status: 401 });
    }

    return NextResponse.json({ isAuth: true, userId: session.userId, role: session.role , userName: session.userName});
}
