import LoginForm from '@/component/ui/LoginForm';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm></LoginForm>
    </Suspense>
  );
}
