import { validateRequest } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await validateRequest();
    return NextResponse.json(session);
}