import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string
  }
}
declare module "next-auth" {

  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null | undefined
      profilePicture?: string | null | undefined
      role?: string | null | undefined
      username?: string | null | undefined
      country?: string | null | undefined
      college?: string | null | undefined
      createdAt?: string | null | undefined
      coverPicture: string
    }
  }
}
