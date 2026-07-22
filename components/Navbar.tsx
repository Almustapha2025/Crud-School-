"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="text-lg font-serif font-bold text-black">
          MustyTech
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="/dashboard"
              className="font-medium text-gray-700 transition hover:text-black"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="font-medium text-gray-700 transition hover:text-black"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/services"
              className="font-medium text-gray-700 transition hover:text-black"
            >
              Services
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="font-medium text-gray-700 transition hover:text-black"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-black px-4 py-2 font-medium text-black transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-black"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-black px-4 py-2 text-center text-black"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-black px-4 py-2 text-center text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}