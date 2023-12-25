import { getData, getUser } from "@/lib/functions"

export const POST = async (request: Request) => {

    const {question_id} = await request.json();

    const answers = await getData({
        coll: "answers",
        key: "question_id",
        value: question_id
    })

    return new Response(JSON.stringify({ answers }), { status: 200 })
}