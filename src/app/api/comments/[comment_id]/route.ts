import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { comment_id: string } }) => {

    const { comment_id } = params;

    if (!comment_id) return new Response(JSON.stringify({ error: "comment not found" }), { status: 404 })

    const comments = await getData({
        coll: "comments",
        key: "commentTo",
        value: comment_id
    })


    if (!comments) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    // if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    // return new Response(JSON.stringify({ user }), { status: 200 })
    return new Response(JSON.stringify({ comments }), { status: 200 })
}