import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { User } from '@/models/User';
import connectDB from '@/lib/db';
import { signIn } from 'next-auth/react';
require('dotenv').config();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDB();

        const user = await User.findOne({ email: email });

        if (!user) throw new Error('User not found');

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error('Incorrect password');

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      if (account.provider === 'google') {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            photo: user.image || profile.picture,
            password: null,
            authType: 'google',
          });
        }
      }

      return true;
    },

    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      session.user = user;
      console.log('session from: ', session, 'token : ', token);
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
