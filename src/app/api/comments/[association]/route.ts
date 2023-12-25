import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { association: string } }) => {

    const { association } = params;

    if (!association) return new Response(JSON.stringify({ error: "comment not found" }), { status: 404 })

    const comments = await getData({
        coll: "comments",
        key: "association",
        value: association
    })

    return new Response(JSON.stringify({ comments }), { status: 200 })
}