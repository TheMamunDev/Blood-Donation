'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import { FiUser, FiLogOut, FiLogIn, FiMenu, FiPlus } from 'react-icons/fi';
import { TiInfoLargeOutline } from 'react-icons/ti';
import { BiSolidDonateBlood } from 'react-icons/bi';
import {
  MdBloodtype,
  MdOutlineBloodtype,
  MdOutlineContactMail,
  MdOutlineHome,
} from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', to: '/', icon: <MdOutlineHome /> },
  {
    label: 'All Requests',
    to: '/requests',
    icon: <BiSolidDonateBlood />,
  },
  {
    label: 'Add Request',
    to: '/dashboard/add-request',
    icon: <MdOutlineBloodtype />,
    auth: true,
  },
  {
    label: 'My Requests',
    to: '/dashboard/my-request',
    icon: <MdOutlineBloodtype />,
    auth: true,
  },
  {
    label: 'About',
    to: '/about',
    icon: <TiInfoLargeOutline />,
  },
  {
    label: 'Contact Us',
    to: '/contact',
    icon: <MdOutlineContactMail />,
  },
];
export default function Navbar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const activeClass = href => {
    if (href === '/')
      return pathName === '/'
        ? 'bg-red-600 text-white'
        : 'text-gray-700 hover:bg-gray-200';
    return pathName.startsWith(href)
      ? 'bg-red-600 text-white'
      : 'text-gray-700 hover:bg-gray-200';
  };

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-red-500">
          <MdBloodtype className="text-2xl mr-1" /> Blood Hub
        </Link>
      </div>

      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">
          {navLinks.map(link => {
            if (link.auth) return null;
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={`px-3 py-2 rounded-md font-medium ${activeClass(
                    link.to
                  )}`}
                >
                  {link.icon} {link.label}
                </Link>
              </li>
            );
          })}
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
                  {navLinks.map(link => {
                    if (!link.auth) return null;
                    return (
                      <li key={link.to}>
                        <Link
                          href={link.to}
                          className={`px-3 py-2 rounded-md font-medium ${activeClass(
                            link.to
                          )}`}
                        >
                          {link.icon} {link.label}
                        </Link>
                      </li>
                    );
                  })}

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
                <Link
                  key={idx}
                  href={item.to}
                  className="flex items-center gap-1"
                >
                  <DropdownMenuItem>{item.label}</DropdownMenuItem>
                </Link>
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
