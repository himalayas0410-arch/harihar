'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X, Calendar, User, Stethoscope } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-forest-900 flex items-center justify-center text-ivory-100 shadow-md shadow-forest-950/20 group-hover:bg-forest-800 transition-colors">
              <ShieldCheck className="w-6 h-6 text-sand-300" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-forest-950">
                Derma<span className="text-forest-700">Care</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-sage-700">
                Dr. Harihar Sharma • MD AIIMS
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-forest-900/80">
            <Link href="/doctor" className="hover:text-forest-700 transition-colors">
              About Doctor
            </Link>
            <Link href="/services" className="hover:text-forest-700 transition-colors">
              Dermatology Services
            </Link>
            <Link href="/pricing" className="hover:text-forest-700 transition-colors">
              Consultation Fees
            </Link>
            <Link href="/faq" className="hover:text-forest-700 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-forest-700 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-forest-900 hover:text-forest-700 bg-ivory-200 hover:bg-ivory-300 rounded-xl transition-colors"
            >
              <User className="w-4 h-4 text-forest-700" />
              Patient Portal
            </Link>

            <Link
              href="/portal/doctor"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-forest-800 bg-sage-100 hover:bg-sage-200 rounded-xl border border-sage-200 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-forest-700" />
              Doctor Workspace
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-ivory-50 bg-forest-900 hover:bg-forest-800 active:bg-forest-950 rounded-xl shadow-md shadow-forest-950/15 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-sand-300" />
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-forest-900 hover:bg-ivory-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-ivory-300 bg-ivory-100 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-forest-900 hover:bg-ivory-200 rounded-xl"
          >
            About Dr. Harihar Sharma
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-forest-900 hover:bg-ivory-200 rounded-xl"
          >
            Dermatology Services
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-forest-900 hover:bg-ivory-200 rounded-xl"
          >
            Consultation Fees & Inclusions
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-forest-900 hover:bg-ivory-200 rounded-xl"
          >
            FAQs & Telemedicine Rules
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-forest-900 hover:bg-ivory-200 rounded-xl"
          >
            Contact Clinic
          </Link>

          <div className="pt-4 border-t border-ivory-300 flex flex-col gap-2.5">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-ivory-50 bg-forest-900 rounded-xl"
            >
              <Calendar className="w-4 h-4 text-sand-300" />
              Book Online Consultation
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-forest-900 bg-ivory-200 rounded-xl"
              >
                <User className="w-4 h-4" />
                Patient Portal
              </Link>
              <Link
                href="/portal/doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-forest-900 bg-sage-100 border border-sage-200 rounded-xl"
              >
                <Stethoscope className="w-4 h-4" />
                Doctor Console
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
