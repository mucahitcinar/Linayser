import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from '@models/user';
import { connectToDB } from "@utils/database";
import clientPromise from '../../../../lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            token: {
                url: "https://www.linkedin.com/oauth/v2/accessToken",
                async request({ client, params, checks, provider }) {
                  const response = await client.oauthCallback(
                    provider.callbackUrl,
                    params,
                    checks,
                    {
                      exchangeBody: {
                        client_id: process.env.LINKEDIN_CLIENT_ID,
                        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                      },
                    }
                  );
                  console.log(response);
                  return {
                    tokens: response,
                  };}}
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
          session.id = user.id;
          return session;
        },
      },
})

export {handler as GET, handler as POST}