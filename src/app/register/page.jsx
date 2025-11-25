'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { toast } from 'react-toastify';

import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const registerSchema = z.object({
  name: z.string().min(1, 'Name Required!'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Minimum 6 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  photo: z.string().url('Invalid photo URL'),
  location: z.string().min(1, 'Location Required!'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
    required_error: 'Blood group is required',
  }),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async data => {
    console.log(data, data.bloodGroup);
    const registrationData = {
      name: data.name,
      email: data.email,
      password: data.password,
      bloodGroup: data.bloodGroup,
      location: data.location,
      photo: data.photo,
    };
    console.log(registrationData);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();
      // console.log(data);
      if (data && data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Registered!',
          text: 'Registration successful! Log in to your account',
          showConfirmButton: false,
          timer: 2000,
        });

        router.push('/login');
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-base-100">
      <div className="card w-full max-w-lg shadow-2xl bg-base-200">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title text-3xl justify-center text-red-600 mb-6">
            Join LifeStream Network
          </h2>
          <div class="card bg-base-100 shrink-0 shadow-2xl">
            <div class="card-body">
              <fieldset class="fieldset ">
                <label class="label">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  class="input w-full"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-400">{errors.name.message}</p>
                )}
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
                <label className="label ">Location </label>
                <input
                  {...register('location')}
                  type="text"
                  class="input w-full"
                  placeholder="Your City/District"
                />
                {errors.location && (
                  <p className="text-red-400">{errors.location.message}</p>
                )}
                <label className="label">Blood Group </label>
                <select
                  {...register('bloodGroup')}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select your Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <p className="text-red-400">{errors.bloodGroup.message}</p>
                )}

                <label className="label">Photo URL </label>
                <input
                  {...register('photo')}
                  type="text"
                  class="input w-full"
                  placeholder="Photo URL"
                />
                {errors.photo && (
                  <p className="text-red-400">{errors.photo.message}</p>
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
                      'Register Now'
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="link link-primary">
                    Login here
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
