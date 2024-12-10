import NextAuth from 'next-auth';

declare module 'next-auth' {
  type User = {
    uid: string;
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

  interface Session extends DefaultSession {
    user: {
      uid?: any;
      id?: string;
    };
  }

  type JWT = {
    uid: string;
  };
}
