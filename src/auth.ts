import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
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
