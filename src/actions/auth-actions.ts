"use server"

import { RedirectType, redirect } from "next/navigation";
import { getAuth } from "../app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export const checkProtected = async (callbackUrl: string) => {
    const session = await getAuth();
    if (!session) {
        redirect(`/login?callbackUrl=${callbackUrl}`);
    }
}


export const loginUser = async (callbackUrl: string) => {
    revalidatePath('/', 'layout')
    redirect(callbackUrl, RedirectType.replace);
}