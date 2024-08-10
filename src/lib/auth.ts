import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { Lucia } from "lucia";
import { User } from "lucia";
import { Session } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production"
        }
    }
});

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }
        return result;
    }
);

export const createSession = async (userId: string) => {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return session;
}

export const deleteSession = async (sessionId: string) => {
    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}