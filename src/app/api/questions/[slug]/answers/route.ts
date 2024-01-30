import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {

    const { slug } = params;

    if (!slug) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    const [question] = await getData({
        coll: "questions",
        key: "slug",
        value: slug
    })

    if (!question) return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 })

    const ans = await getData({
        coll: "answers",
        key: "question_id",
        value: question.id,
        order: "asc"
    });

    const answers = await Promise.all(ans.map(async answer => {
        const user = await getUser(answer.user_id as string);
        return {
            ...answer,
            user: {
                username: user?.username,
                profilePicture: user?.profilePicture,
                name: user?.name,
                id: user?.id
            }
        };
    }));


    return Response.json({
        answers
    }, { status: 200 })
}