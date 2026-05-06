import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (
        pathname.match(/\.(.*)$/) ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') ||
        pathname === '/favicon.ico'
      ) {
        return true;
      }

      if (!isLoggedIn && pathname !== '/login') {
        return Response.redirect(new URL('/login', request.nextUrl));
      }

      if (isLoggedIn && pathname === '/login') {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      return true;
    },
  },
});
