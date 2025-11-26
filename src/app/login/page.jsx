import SessionLoader from '@/component/loader/SessionLoader';
import LoginForm from '@/component/ui/LoginForm';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense fallback={<SessionLoader></SessionLoader>}>
      <LoginForm></LoginForm>
    </Suspense>
  );
}
