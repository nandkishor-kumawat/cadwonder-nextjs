import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { question_id: string } }) => {

    const { question_id } = params;

    if (!question_id) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    const answers = await getData({
        coll: "answers",
        key: "question_id",
        value: question_id
    })

    return new Response(JSON.stringify({ answer_count: answers.length }), { status: 200 })
}