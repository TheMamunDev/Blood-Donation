'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ca } from 'zod/v4/locales';

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
  };
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  if (status === 'loading') return <p>Checking session...</p>;
  const handleGoogle = e => {
    e.preventDefault();
    signIn('google', { callbackUrl });
  };
  return (
    <div className="flex justify-center items-center py-10 bg-base-100">
      <div className="card w-full max-w-lg shadow-2xl bg-base-200">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title text-3xl text-center justify-center text-red-600 mb-6 p-4">
            Welcome back to Blood Hub
          </h2>
          <div className="card bg-base-100 shrink-0 shadow-2xl">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="card-body">
              <fieldset className="fieldset ">
                <label className="label">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}
                <label className="label">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <div className="form-control mt-6 flex flex-col md:flex-row gap-3">
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
                  <button
                    onClick={handleGoogle}
                    className="btn btn-lg bg-white text-black border-[#e5e5e5]"
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                </div>

                <div className="text-center mt-4">
                  New In Blood Hub?{' '}
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
