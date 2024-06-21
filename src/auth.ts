import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import clientPromise from "./database/mongoClientPromise";
import { getUserById } from "./database/queries/user";
import { UsersModel } from "./models/user-model";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // Check if email is verified
      const existingUser = await getUserById(user?.id);
      if (!existingUser?.emailVerified) return false;

      // TODO - Add 2FA here

      return true;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token }) {
      if (token) {
        token.id = token.sub;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        if (credentials == null) return null;

        try {
          const user = await UsersModel.findOne({ email: credentials?.email });
          if (user) {
            const isPasswordMatch = await bcrypt.compare(
              credentials?.password,
              user?.password,
            );

            if (isPasswordMatch) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  trustHost: true,
});
