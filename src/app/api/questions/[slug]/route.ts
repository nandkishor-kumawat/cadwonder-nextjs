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
    const user = await getUser(question.user_id as string) as {
        username: string;
        profilePicture: string;
        name: string;
        id: string
    };

    return new Response(JSON.stringify({
        question:{
            ...question, user: {
                username: user?.username,
                profilePicture: user?.profilePicture,
                name: user?.name,
                id: user?.id
        }
        }
    }), { status: 200 })
}