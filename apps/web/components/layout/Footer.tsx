import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Medical Emergency Disclaimer Alert */}
        <div className="mb-12 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-amber-200/90 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-300 font-semibold">Emergency Advisory:</strong> DermaCare is a digital telemedicine practice for non-emergency skin, hair, and nail conditions. If you are experiencing sudden severe allergic reactions, angioedema (swelling of lips/tongue/airway), extensive peeling rashes with high fever, or breathing difficulty, please visit the nearest hospital emergency room immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Doctor Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Derma<span className="text-brand-400">Care</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dr. Harihar Sharma, MBBS (AIIMS), MD (Dermatology, Venereology & Leprosy).
              Registration: NMC/MCI/2015/78412 (Delhi Medical Council). Practicing under the Telemedicine Practice Guidelines (2020) issued by NMC India.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-400" /> Mon - Sat: 10:00 AM – 7:30 PM IST
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" /> New Delhi & Online Pan-India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Dermatology Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services#acne" className="hover:text-brand-400 transition-colors">
                  Acne & Cystic Breakout Care
                </Link>
              </li>
              <li>
                <Link href="/services#hair" className="hover:text-brand-400 transition-colors">
                  Hair Fall & Trichology Consult
                </Link>
              </li>
              <li>
                <Link href="/services#pigmentation" className="hover:text-brand-400 transition-colors">
                  Melasma & Skin Tone Correction
                </Link>
              </li>
              <li>
                <Link href="/services#eczema" className="hover:text-brand-400 transition-colors">
                  Eczema, Psoriasis & Atopic Skin
                </Link>
              </li>
              <li>
                <Link href="/services#followup" className="hover:text-brand-400 transition-colors">
                  Follow-Up Review (Within 30 Days)
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Portals & Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Patient Care & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/book" className="hover:text-brand-400 transition-colors">
                  Schedule Video Consultation
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-brand-400 transition-colors">
                  Access My Prescriptions & Records
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-400 transition-colors">
                  Consultation Pricing & Inclusions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/portal/doctor" className="hover:text-brand-400 transition-colors">
                  Doctor Login Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Compliance & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" /> +91 98765 43210 (WhatsApp Care)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" /> clinic@dermacare.in
              </p>
              <div className="pt-3 border-t border-slate-800 space-y-1.5">
                <Link href="/terms" className="block text-slate-400 hover:text-white transition-colors">
                  Telemedicine Consent & Terms
                </Link>
                <Link href="/privacy" className="block text-slate-400 hover:text-white transition-colors">
                  Privacy Policy (DPDP Act 2023)
                </Link>
                <Link href="/pricing#refunds" className="block text-slate-400 hover:text-white transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DermaCare Telemedicine Platform. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            Compliant with Indian National Medical Commission (NMC) Telemedicine Practice Guidelines (2020).
          </p>
        </div>
      </div>
    </footer>
  );
}
