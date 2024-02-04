import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const googleClientId = process.env.GOOGLECLIENTID || "";
const googleClientSecret = process.env.GOOGLECLIENTSECRET || "";

const handler= NextAuth({
    providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
})

export { handler as GET, handler as POST };