import NextAuth from "next-auth/next";
// this is the main entry point, and it handles different types of request

import GoogleProvider from "next-auth/providers/google"

// types
import type { NextAuthOptions } from "next-auth"


export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ]
}


const handler = NextAuth(options)

export { handler as GET, handler as POST }