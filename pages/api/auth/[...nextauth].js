import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Cognito({
      clientId: process.env.APP_CLIENT_ID,
      clientSecret: process.env.APP_CLIENT_SECRET,
      issuer: process.env.COGNITO_DOMAIN,
    }),

    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
});
