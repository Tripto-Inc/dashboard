import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import NextAuth from 'next-auth';
import { encode } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { loginFormSchema } from './features/authentication/schema';

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,

  session: {
    strategy: 'database',
  },

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginFormSchema.parse(credentials);

        const user = await prisma.user.findFirst({
          where: {
            username: validatedCredentials.username,
          },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(validatedCredentials.password, user.password);

        if (!isValid) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

      if (isAuthPage && isLoggedIn) return Response.redirect(new URL('/', request.nextUrl));
      if (!isLoggedIn && !isAuthPage) return false;

      return true;
    },

    async jwt({ token, account }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }

      return token;
    },
  },

  jwt: {
    async encode(params) {
      if (params.token?.credentials) {
        if (!params.token.sub) return '';

        const sessionToken = crypto.randomBytes(32).toString('hex');

        await adapter.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return sessionToken;
      }

      return encode(params);
    },
  },
});
