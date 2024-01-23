import { getData, getUser } from "@/lib/functions"
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {

    const { slug } = params;

    if (!slug) return new Response(JSON.stringify({ error: "Wrong Url" }), { status: 404 })

    const [model] = await getData({
        coll: "models",
        key: "slug",
        value: slug
    })

    if (!model) return NextResponse.json({ error: "No Model found" }, { status: 404 });

    const user = await getUser(model.user_id as string) as {
        username: string;
        profilePicture: string;
        name: string;
        id: string
    };

    const modelData = {
        ...model,
        user: {
            username: user?.username,
            profilePicture: user?.profilePicture,
            name: user?.name,
            id: user?.id
        }
    }

    return NextResponse.json({ model: modelData }, { status: 200 });
}