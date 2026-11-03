'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X, Calendar, User, Stethoscope } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                Derma<span className="text-brand-600">Care</span>
              </span>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Clinic of Dr. Harihar Sharma
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <Link href="/doctor" className="hover:text-brand-700 transition-colors">
              About Doctor
            </Link>
            <Link href="/services" className="hover:text-brand-700 transition-colors">
              Treatments & Services
            </Link>
            <Link href="/pricing" className="hover:text-brand-700 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-brand-700 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-brand-700 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              <User className="w-4 h-4 text-slate-500" />
              Patient Portal
            </Link>

            <Link
              href="/portal/doctor"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-800 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-brand-600" />
              Doctor Workspace
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-sm shadow-brand-600/30 transition-all hover:shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            About Doctor
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Treatments & Services
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Pricing & Packages
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            FAQs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Contact Clinic
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl"
            >
              <Calendar className="w-4 h-4" />
              Book Online Consultation
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                <User className="w-4 h-4" />
                Patient Portal
              </Link>
              <Link
                href="/portal/doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-200 rounded-lg"
              >
                <Stethoscope className="w-4 h-4" />
                Doctor Workspace
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
