import SessionLoader from '@/component/loader/SessionLoader';
import LoginForm from '@/component/ui/LoginForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Login | Blood Hub',
  description: 'Donate your blood today',
};
export default function Login() {
  return (
    <Suspense fallback={<SessionLoader></SessionLoader>}>
      <LoginForm></LoginForm>
    </Suspense>
  );
}
