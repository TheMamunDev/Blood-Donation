import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { User } from '@/models/User';
import connectDB from '@/lib/db';

export const authOptions = {
  providers: [
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
    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      session.user = user;
      console.log('session : ', session, 'token : ', token);
      return session;
    },

    async signIn({ user, account }) {
      if (account.provider === 'google') {
        await connectDB();
        const exists = await User.findOne({ email: user.email });

        if (!exists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
      }
      return true;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
