import { getServerSession, type DefaultUser, type NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';


export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            async profile(profile) {
                // const user = await getUserBy("email", profile.email);

                // if (user) {
                //     return user
                // } else {
                //     redirect(`/signup?email=${profile.email}&name=${profile.name}`);
                // }

                // return user;

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
        },
        // async signIn({ account, profile }) {
        //     if (account?.provider === "google") {
        //         const user = await getUserBy("email", profile?.email as string);
        //         return user;
        //     }
        //     return true // Do different verification for other providers that don't have `email_verified`
        // },

    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
}

export const getAuth = () => getServerSession(options);

export function getAuthSession(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, options)
  }