import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { association_id: string } }) => {

    const { association_id } = params;

    if (!association_id) return new Response(JSON.stringify({ error: "comment not found" }), { status: 404 })

    const comments = await getData({
        coll: "comments",
        key: "association_id",
        value: association_id
    })

    return new Response(JSON.stringify({ comments }), { status: 200 })
}