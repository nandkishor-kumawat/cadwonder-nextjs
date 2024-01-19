"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const loginUser = async (callbackUrl: string) => {
    revalidatePath('/', 'layout')
    redirect(callbackUrl);
}