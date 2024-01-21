"use server"

import { redirect } from "next/navigation";
import { getAuth } from "../app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export const checkProtected = async (callbackUrl: string) => {
    const session = await getAuth();
    console.log(session)
    if (!session) {
        redirect(`/login?callbackUrl=${callbackUrl}`);
    }
}


export const loginUser = async (callbackUrl: string) => {
    revalidatePath('/', 'layout')
    redirect(callbackUrl);
}