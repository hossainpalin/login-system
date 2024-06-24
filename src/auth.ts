import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import authConfig from "./auth.config";
import clientPromise from "./database/mongoClientPromise";
import { getTwoFactorConfirmationTokenByEmail } from "./database/queries/two-factor-confirmation";
import { getUserById } from "./database/queries/user";
import { UsersModel } from "./models/user-model";
import connectMongoDB from "./services/mongo";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // Check if email is verified
      const existingUser = await getUserById(user?.id as string);

      if (!existingUser?.emailVerified) return false;

      // Check if two factor is enabled
      if (existingUser?.isTwoFactorEnabled) {
        const existingConfirmation = await getTwoFactorConfirmationTokenByEmail(
          existingUser?.email as string,
        );

        if (!existingConfirmation) return true;

        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        if (credentials == null) return null;

        try {
          await connectMongoDB();
          const user = await UsersModel.findOne({ email: credentials?.email });

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
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
