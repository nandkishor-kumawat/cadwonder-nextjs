import { getData, getUser } from "@/lib/functions"

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {

    const { slug } = params;

    if (!slug) return new Response(JSON.stringify({ error: "Wrong Url" }), { status: 404 })

    const models = await getData({
        coll: "models",
        key: "slug",
        value: slug
    })

    const model = models[0];

    if (!model) return new Response(JSON.stringify({ error: "Model not found" }), { status: 404 });

    const user = await getUser(model.user_id as string) as {
        username: string;
        profilePicture: string;
        name: string;
        id: string
    };


    return new Response(JSON.stringify({
        model: {
            ...model,
            user: {
                username: user?.username,
                profilePicture: user?.profilePicture,
                name: user?.name,
                id: user?.id
            }
        }
    }), { status: 200 })
}