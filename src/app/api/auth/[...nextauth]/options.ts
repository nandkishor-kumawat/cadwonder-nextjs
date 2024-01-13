import type { DefaultUser, NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
interface User {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log(profile)
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    role: "user",
                    image: profile.picture
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({

            name: 'credentials',

            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "jsmith",
                    required: true
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true
                }
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const data = userCredential.user;
                const userRef = doc(db, 'users', data?.uid);
                const userData = await getDoc(userRef);
                const user = userData.data();

                if (user) {
                    return {
                        ...user,
                        id: user?.uid,
                    }
                }

                return null;
            },
        })

    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        
        async session({ session, token }) {
            session.user = token as any;
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
}