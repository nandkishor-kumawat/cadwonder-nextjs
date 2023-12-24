import { getUsers } from "@/lib/functions";

export const GET = async (request: Request) => {


    const users = await getUsers();
    if (!users) {
        return new Response(JSON.stringify({ error: "No users found" }), { status: 404 })
    }

    return new Response(JSON.stringify({ users }), { status: 200 })
}