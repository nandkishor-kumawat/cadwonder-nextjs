"use server"
import { revalidatePath } from "next/cache"

export const postModel = async (path:string) => {
    revalidatePath(path)
}