import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from '@models/user';
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        LinkedInProvider({
            authorization:{
                params:{
                    response_type:"code",
                    client_id:process.env.LINKEDIN_CLIENT_ID,
                    redirect_uri:"http://localhost:3000/api/auth/callback/linkedin",
                }
            },
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDB();
    
                //check if user exists
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                //if not, create user
                if (!userExists){
                    await User.create({
                        linkedinId:profile.id,
                        email: profile.email,
                        name: profile.name,
                        profilePicture: profile.image
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
})

export {handler as GET, handler as POST}