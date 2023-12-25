import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { user_id: string } }) => {

    const { user_id } = params;

    if (!user_id) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })

    const followers = await getData({
        coll: "followers",
        key: "following",
        value: user_id
    })


    if (!followers) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    // if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    // return new Response(JSON.stringify({ user }), { status: 200 })
    return new Response(JSON.stringify({ followers }), { status: 200 })
}