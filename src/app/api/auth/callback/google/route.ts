import { createSession, google } from "@/lib/auth";
import { GoogleRefreshedTokens, OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies().get('google_oauth_state')?.value;
    const savedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value;

    if (!code || !state || !storedState || !savedCodeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, savedCodeVerifier);

        let googleRefreshToken: GoogleRefreshedTokens | undefined = undefined;

        if (tokens.refreshToken) {
            googleRefreshToken = await google.refreshAccessToken(tokens.refreshToken);
        }

        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            }
        );

        const googleUser = await googleUserResponse.json();

        console.log(googleUser);

        //TODO: check if user exists in database

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });


    } catch (error) {
        console.error("Error exchanging code for token", error);

        if (error instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400,
                statusText: "Bad Request",
            });
        }

        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }

}