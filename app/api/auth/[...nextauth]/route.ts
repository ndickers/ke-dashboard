import NextAuth, { Session, SessionStrategy, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";


const authOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${process.env.NEXT_API_URL}/login`, { email: credentials?.email, password: credentials?.password });
                    if (response.statusText === "OK") {
                        return { token: response.data?.token, id: response.data?.user?.id, name: response.data.user.userName, email: response.data.user.email };
                    } else {
                        return null;
                    }
                } catch (error: any) {
                    if (error?.response?.data) {

                        throw new Error(error?.response?.data?.message);
                    } else {
                        throw new Error(error);
                    }
                }
            },

        })]
    ,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }): Promise<JWT> {
            if (user) {
                token.accessToken = (user as any).token;
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session({ token, session }: { token: JWT, session: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.accessToken = token.accessToken;
            }
            return session
        }
    },
    session: {
        strategy: "jwt" as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }