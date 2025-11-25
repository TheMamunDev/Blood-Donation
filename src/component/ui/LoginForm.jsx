'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const loginSchema = z.object({
  email: z.email('Invalid Email'),
  password: z.string().min(1, ' Password Required'),
});

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async data => {
    setError('');
    setLoading(true);
    if (!data.email || !data.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });
    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password');
      return;
    }
    router.push(callbackUrl);
  };
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading') return <p>Checking session...</p>;

  return (
    <div className="flex justify-center items-center py-10 bg-base-100">
      <div className="card w-full max-w-lg shadow-2xl bg-base-200">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title text-3xl text-center justify-center text-red-600 mb-6 p-4">
            Welcome back to LifeStream Network
          </h2>
          <div class="card bg-base-100 shrink-0 shadow-2xl">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div class="card-body">
              <fieldset class="fieldset ">
                <label class="label">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  class="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}
                <label class="label">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  class="input w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}

                <div>
                  <a class="link link-hover">Forgot password?</a>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Login Now'
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  New In LifeStream Network?{' '}
                  <Link href="/register" className="link link-primary">
                    Register Here
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
