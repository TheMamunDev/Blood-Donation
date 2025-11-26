import './globals.css';
import LayoutProvider from '@/component/providers/LayoutProvider';

export const metadata = {
  title: 'Blood Donation',
  description: 'Donate your donation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="max-w-7xl mx-auto">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
