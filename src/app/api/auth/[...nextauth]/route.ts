import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
interface NewUser extends User {
  uid: string;
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Firebase Credentials',
      credentials: {
        uid: { type: 'text' },
        email: { type: 'text' },
        name: { type: 'text' },
      },
      async authorize(credentials) {
        const { uid, email, name = '' } = credentials; // 기본값 설정

        if (!uid || !email) {
          throw new Error('잘못된 인증 정보입니다.');
        }

        return { id: uid, uid, email, name }; // User 타입에 맞게 반환
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // if ('uid' in user) {
      if (user) {
        token.uid = user.id; // 타입 에러 해결
      }
      return token;
    },
    async session({ session, token }) {
      // if ('uid' in session.user) {
      session.user.uid = token.uid; // 타입 에러 해결
      // }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
