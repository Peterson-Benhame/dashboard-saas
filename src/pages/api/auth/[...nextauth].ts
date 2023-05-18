import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import config from "@app/src/_start/config";
import { MySession } from '@app/src/types';
import { prisma } from '@app/src/utils/ssr';

const actualDateInSeconds = Math.floor(Date.now() / 1000);
const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, _) {
        debugger;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        }) as User | null;
        // if user doesn't exist or password doesn't match
        if (!user || !(password === user.password)) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
  adapter: PrismaAdapter(prisma),
  secret: config.SECRET,
  callbacks: {
    async jwt({ token, user, account }) {

      const isSignIn = !!user;

      if (isSignIn) {
        token.id = user.id;
        return Promise.resolve(token);
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      // Add property to session, like an access_token from a provider.
      (session as MySession ).userId = token.id?.toString();
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login", 
    error: "/login", 
  },
});
