import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {

    const { slug } = params;

    if (!slug) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    const questions = await getData({
        coll: "questions",
        key: "slug",
        value: slug
    })

    const question = questions[0];

    if (!question) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })
    const user = await getUser(question.user_id as string);

    // if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    // return new Response(JSON.stringify({ user }), { status: 200 })
    return new Response(JSON.stringify({
        question, user: {
            username: user?.username,
            profilePicture: user?.profilePicture,
            name: user?.name,
            id: user?.id
        }
    }), { status: 200 })
}