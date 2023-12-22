import { getUser } from "@/lib/functions"

export const GET = async (request: Request) => {
    const user_id =request.url.split('/').pop()
    const user = await getUser(user_id)
    if(!user) return new Response(JSON.stringify({error: "User not found"}), {status: 404})
    return new Response(JSON.stringify({user}), {status: 200})
}