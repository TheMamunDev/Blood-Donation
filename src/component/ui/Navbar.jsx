'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { FiUser, FiLogOut, FiLogIn, FiMenu, FiPlus } from 'react-icons/fi';
import {
  MdBloodtype,
  MdNoteAdd,
  MdOutlineHome,
  MdOutlineRealEstateAgent,
  MdRealEstateAgent,
  MdStarBorder,
} from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', to: '/', icon: <MdOutlineHome /> },

  {
    label: 'All Requests',
    to: '/requests',
    icon: <MdNoteAdd />,
  },
  {
    label: 'About',
    to: '/my-properties',
    icon: <MdRealEstateAgent />,
  },
  {
    label: 'Add Request',
    to: '/dashboard/add-request',
    icon: <MdStarBorder />,
    auth: true,
  },
  {
    label: 'My Requests',
    to: '/dashboard/my-request',
    icon: <MdStarBorder />,
    auth: true,
  },
];
export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-red-500">
          <MdBloodtype className="text-2xl mr-1" /> Blood Hub
        </Link>
      </div>

      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/my-request">My Requests</Link>
          </li>
          <li>
            <Link href="/requests">All Request</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            {isLoading && (
              <span className="loading loading-spinner text-red-500"></span>
            )}

            {!isLoading && isAuthenticated && (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-primary m-1 flex items-center gap-2"
                >
                  <FiUser /> {session?.user?.name?.split(' ')[0] || 'User'}
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 bg-base-100 shadow rounded-box w-56"
                >
                  <li>
                    <Link href="/dashboard/add-request">
                      <FiPlus /> Add Request
                    </Link>
                  </li>

                  <li>
                    <Link href="/dashboard/my-request">Manage Request</Link>
                  </li>

                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-error flex items-center gap-1"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {!isLoading && !isAuthenticated && (
              <div className="space-x-2">
                <Link href="/login" className="btn btn-outline btn-primary">
                  <FiLogIn /> Login
                </Link>
                <Link href="/register" className="btn btn-secondary">
                  Register
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="ml-3 lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-neutral">
              <FiMenu className="text-xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-base-100 text-neutral "
            align="end"
          >
            {navLinks
              .filter(item => !item.auth || isAuthenticated)
              .map((item, idx) => (
                <DropdownMenuItem key={idx}>
                  <Link href={item.to} className="flex items-center gap-1">
                    {item.label}
                  </Link>
                  <DropdownMenuShortcut>IC</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            {isAuthenticated ? (
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                <button className="flex items-center gap-1 text-red-500 border-2 border-red-400 rounded-2xl px-2">
                  LogOut
                </button>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link href={'/login'} className="flex items-center gap-1">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/register'} className="flex items-center gap-1">
                    Register
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
