import { getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { user_id: string } }) => {
    const { user_id } = params;
    const user = await getUser(user_id)
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    return new Response(JSON.stringify({ user }), { status: 200 })
}