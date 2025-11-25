// src/components/ui/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { MdBloodtype } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content border-t border-gray-200 mt-12">
      <aside>
        <MdBloodtype className="text-5xl text-red-600" />
        <p className="font-bold text-lg">
          Blood Hub
          <br />
          Providing reliable blood connection since 2024
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="/about" className="link link-hover">
            About Us
          </Link>
          <Link href="/list" className="link link-hover">
            Find Requests
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
          <Link href="/privacy" className="link link-hover">
            Privacy Policy
          </Link>
        </div>
      </nav>

      <aside>
        <p>Copyright © {currentYear} - All rights reserved by Blood Hub</p>
      </aside>
    </footer>
  );
}
