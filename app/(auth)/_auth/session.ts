import 'server-only';

import { SessionPayload } from './validation';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string, role: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt, role })
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
    role==='sales' ? redirect('/sales/pos') : redirect('/admin/dashboard');
};
export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: Number(session.userId), role: session.role};
};

export function deleteSession() {
    cookies().delete('session');
    redirect('/login');
}