import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    createdAt: Date;
    user: {
      city: string;
      locale: string;
      region: string;
      country: string;
      createdAt: Date;
    } & DefaultSession['user'];
  }
}
