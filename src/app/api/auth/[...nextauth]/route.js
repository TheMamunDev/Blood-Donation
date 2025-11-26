import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { User } from '@/models/User';
import connectDB from '@/lib/db';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials;

        const user = await User.findOne({ email }).lean();
        if (!user) throw new Error('User not found');

        const passwordMatch = await bcrypt.compare(
          password,
          user.password || ''
        );
        if (!passwordMatch) throw new Error('Incorrect password');
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.photo,
          authType: user.authType,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account.provider === 'google') {
        const existingUser = await User.findOne({ email: user.email }).lean();
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            photo: user.image || user.picture || null,
            password: null,
            authType: 'google',
          });
        }
      }
      return true;
    },

    async session({ session, token }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email }).lean();
      if (!user) return session;
      session.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.photo,
        authType: user.authType,
      };
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
