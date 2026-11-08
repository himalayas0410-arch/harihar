'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Menu,
  X,
  Calendar,
  User,
  Stethoscope,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  Phone,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortalDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-ivory-300 shadow-sm transition-all">
      {/* Top micro-bar for clinical trust */}
      <div className="bg-forest-950 text-ivory-100/90 text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Dr. Harihar Sharma • MD Dermatology (AIIMS) • NMC Reg: NMC/MCI/2015/78412
            </span>
            <span className="text-sand-400/80">•</span>
            <span className="text-sage-300 hidden lg:inline">
              100% Compliant with Telemedicine Practice Guidelines 2020
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-sage-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sand-400" /> Mon - Sat: 10:00 AM – 7:30 PM IST
            </span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand-300 transition-colors flex items-center gap-1 text-ivory-100 font-semibold"
            >
              <Phone className="w-3 h-3 text-emerald-400" /> Clinic Desk: +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-forest-900 flex items-center justify-center text-ivory-100 shadow-md shadow-forest-950/20 group-hover:bg-forest-800 transition-all group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-sand-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-forest-950">
                  Derma<span className="text-forest-700">Care</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 font-bold uppercase tracking-wider">
                  Clinic
                </span>
              </div>
              <p className="text-[11px] font-semibold text-sage-700 tracking-tight">
                Dr. Harihar Sharma • AIIMS MD
              </p>
            </div>
          </Link>

          {/* Center Navigation Links - Generous spacing, responsive visibility */}
          <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold text-forest-900/80">
            <Link
              href="/doctor"
              className="hover:text-forest-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-forest-700 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              About Doctor
            </Link>
            <Link
              href="/services"
              className="hover:text-forest-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-forest-700 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Dermatology Services
            </Link>
            <Link
              href="/pricing"
              className="hover:text-forest-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-forest-700 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Consultation Fees
            </Link>
            <Link
              href="/faq"
              className="hover:text-forest-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-forest-700 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="hover:text-forest-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-forest-700 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Compact Nav for Large Screens (1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-5 text-sm font-semibold text-forest-900/80">
            <Link href="/doctor" className="hover:text-forest-700 transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-forest-700 transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-forest-700 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-forest-700 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-forest-700 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Group on the Right (No crowding, perfectly spaced) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Unified Portals Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-forest-900 hover:text-forest-950 bg-white hover:bg-ivory-200 border border-ivory-300 rounded-xl transition-all shadow-sm"
                aria-expanded={portalDropdownOpen}
                aria-label="Access Patient or Doctor Portals"
              >
                <User className="w-4 h-4 text-forest-700" />
                <span>Portals & Login</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-sage-600 transition-transform ${
                    portalDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-ivory-300 p-2 space-y-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-ivory-200">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-sage-700">
                      Select Workspace
                    </p>
                  </div>

                  {/* Patient Portal Option */}
                  <Link
                    href="/portal"
                    onClick={() => setPortalDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-forest-50/70 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center shrink-0 group-hover:bg-forest-800 group-hover:text-ivory-50 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest-950 group-hover:text-forest-800">
                        Patient Portal
                      </p>
                      <p className="text-[11px] text-sage-700 leading-tight">
                        Access prescriptions, skin photos, appointments & history
                      </p>
                    </div>
                  </Link>

                  {/* Doctor Workspace Option */}
                  <Link
                    href="/portal/doctor"
                    onClick={() => setPortalDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sage-100/70 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sage-200 text-forest-900 flex items-center justify-center shrink-0 group-hover:bg-forest-900 group-hover:text-ivory-50 transition-colors">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest-950 group-hover:text-forest-800">
                        Doctor Console
                      </p>
                      <p className="text-[11px] text-sage-700 leading-tight">
                        Clinical notes, SOAP intake, prescription signing & calendar
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Primary Action Button: Book Consultation */}
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 active:bg-forest-950 rounded-xl shadow-md shadow-forest-950/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Calendar className="w-4 h-4 text-sand-300" />
              <span>Book Consultation</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-ivory-50 bg-forest-900 rounded-lg shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-sand-300" />
              <span>Book</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-forest-950 bg-white hover:bg-ivory-200 border border-ivory-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-ivory-300 bg-white/98 backdrop-blur-lg px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-ivory-200">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-forest-900 bg-forest-50 border border-forest-200 rounded-xl"
            >
              <User className="w-4 h-4 text-forest-700" />
              Patient Portal
            </Link>
            <Link
              href="/portal/doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-forest-900 bg-sage-100 border border-sage-200 rounded-xl"
            >
              <Stethoscope className="w-4 h-4 text-forest-700" />
              Doctor Console
            </Link>
          </div>

          <nav className="space-y-1">
            <Link
              href="/doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest-900 hover:bg-ivory-100 rounded-xl"
            >
              <span>About Dr. Harihar Sharma</span>
              <ArrowRight className="w-4 h-4 text-sage-400" />
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest-900 hover:bg-ivory-100 rounded-xl"
            >
              <span>Dermatology Services</span>
              <ArrowRight className="w-4 h-4 text-sage-400" />
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest-900 hover:bg-ivory-100 rounded-xl"
            >
              <span>Consultation Fees & Inclusions</span>
              <ArrowRight className="w-4 h-4 text-sage-400" />
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest-900 hover:bg-ivory-100 rounded-xl"
            >
              <span>FAQs & Telemedicine Rules</span>
              <ArrowRight className="w-4 h-4 text-sage-400" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-forest-900 hover:bg-ivory-100 rounded-xl"
            >
              <span>Contact Clinic</span>
              <ArrowRight className="w-4 h-4 text-sage-400" />
            </Link>
          </nav>

          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-ivory-50 bg-forest-900 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4 text-sand-300" />
              Book Online Consultation (₹999)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
