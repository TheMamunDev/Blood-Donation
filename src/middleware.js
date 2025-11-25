import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/donors/:path*',
    '/profile/:path*',
    '/add-request/:path*',
    '/manage-products/:path*',
  ],
};
