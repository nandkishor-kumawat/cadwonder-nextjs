import { lucia, validateRequest } from "@/lib/auth"
import { cookies } from "next/headers";

export const GET = async () => {
    const { session } = await validateRequest();
    if (session) {
        await lucia.invalidateSession(session.id);
    }
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return Response.json({ message: "Signed out" });
}