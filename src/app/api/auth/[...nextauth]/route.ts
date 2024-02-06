import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const googleClientId = process.env.GOOGLECLIENTID || "";
const googleClientSecret = process.env.GOOGLECLIENTSECRET || "";

const authOptions= {
    providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };