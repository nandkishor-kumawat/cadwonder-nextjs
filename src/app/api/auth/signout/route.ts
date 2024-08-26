import { lucia, validateRequest } from "@/lib/auth"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const { session } = await validateRequest();
    if (session) {
        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    // revalidatePath('/login', 'layout')
    // redirect('http://localhost:3001/login');
}