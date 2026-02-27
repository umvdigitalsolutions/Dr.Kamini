"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "about-us" },
    { name: "Services", href: "services" },
    { name: "Stories", href: "stories" },
    { name: "Contact Us", href: "contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-pink-200/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="" href="/">
          <img
            alt="Dr. Kamini Physiotherapy logo"
            src="/doctor.svg"
            className="h-12 w-auto md:h-12 object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-12 text-lg text-slate-600 md:flex googleFontss-dancingScript">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
                className="transition text-pink-500 googleFontss-ChangaOne"
                >
                {link.name}
                </Link>
            ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+919772919458" className="hidden rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_18px_rgba(12,74,68,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(12,74,68,0.24)] md:inline-flex">
            Call Now
          </a>
          <button
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center rounded-full border border-teal-900/40 p-2 text-teal-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_20px_rgba(15,23,42,0.12)] md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="h-0.5 w-full rounded-full bg-teal-900" />
              <span className="h-0.5 w-full rounded-full bg-teal-900" />
              <span className="h-0.5 w-full rounded-full bg-teal-900" />
            </span>
          </button>
        </div>
      </div>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-20 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        id="mobile-nav"
      >
        <button
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/25 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          type="button"
        />
        <div
          className={`absolute inset-x-4 top-20 rounded-3xl border border-black/10 bg-white/95 p-5 shadow-[0_20px_36px_rgba(23,24,26,0.18)] transition-all duration-200 ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-3 text-sm text-slate-700">
            {navLinks.map((link) => (
                <Link
                key={link.name}
              className="transition hover:text-teal-800"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
            ))}
          </nav>
          <a
            href="tel:+919772919458"
            className="mt-4 w-full inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-md hover:bg-teal-800 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-200"
            aria-label="Call to book"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
