import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-forest-950 text-sage-200 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Medical Emergency Disclaimer Alert */}
        <div className="mb-12 p-4 sm:p-5 bg-sand-700/10 border border-sand-500/25 rounded-2xl flex items-start gap-3.5 text-sand-100 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-sand-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-sand-300 font-semibold">Emergency Medical Advisory:</strong> DermaCare is an outpatient digital telemedicine practice intended for non-emergency dermatological, trichological, and aesthetic skin conditions. If you are experiencing acute facial/airway swelling, sudden severe allergic reactions (anaphylaxis), extensive blistered peeling skin with high fever, or difficulty breathing, please seek immediate emergency care at the nearest hospital casualty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Doctor Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-800 border border-forest-700 flex items-center justify-center text-ivory-100">
                <ShieldCheck className="w-5 h-5 text-sand-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-ivory-50">
                Derma<span className="text-sage-300">Care</span>
              </span>
            </div>
            <p className="text-xs text-sage-300 leading-relaxed">
              Dr. Harihar Sharma, MBBS (AIIMS), MD (Dermatology, Venereology & Leprosy).
              NMC Reg. No: <strong>NMC/MCI/2015/78412</strong> (Delhi Medical Council). Practicing in strict adherence to the Telemedicine Practice Guidelines (2020) issued by the National Medical Commission of India.
            </p>
            <div className="pt-2 text-xs text-sage-300 space-y-1.5">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sand-400" /> Mon - Sat: 10:00 AM – 7:30 PM IST
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sand-400" /> Telemedicine Pan-India & New Delhi Clinic
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Dermatology Services
            </h4>
            <ul className="space-y-2.5 text-xs text-sage-300">
              <li>
                <Link href="/services#acne" className="hover:text-sand-300 transition-colors">
                  Acne & Post-Acne Scarring
                </Link>
              </li>
              <li>
                <Link href="/services#hair" className="hover:text-sand-300 transition-colors">
                  Hair Fall & Trichology Assessment
                </Link>
              </li>
              <li>
                <Link href="/services#pigmentation" className="hover:text-sand-300 transition-colors">
                  Melasma & Skin Tone Correction
                </Link>
              </li>
              <li>
                <Link href="/services#eczema" className="hover:text-sand-300 transition-colors">
                  Eczema, Psoriasis & Rash Relief
                </Link>
              </li>
              <li>
                <Link href="/services#followup" className="hover:text-sand-300 transition-colors">
                  Follow-Up Review (Within 30 Days)
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Portals & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Patient Care & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-sage-300">
              <li>
                <Link href="/book" className="hover:text-sand-300 transition-colors">
                  Schedule Video Consultation
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-sand-300 transition-colors">
                  Access My Prescriptions & Records
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sand-300 transition-colors">
                  Consultation Pricing & Inclusions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sand-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/portal/doctor" className="hover:text-sand-300 transition-colors">
                  Doctor Login Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Support & Compliance
            </h4>
            <div className="space-y-3 text-xs text-sage-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sand-400" /> +91 98765 43210 (WhatsApp Desk)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sand-400" /> clinic@dermacare.in
              </p>
              <div className="pt-3 border-t border-forest-900 space-y-2">
                <Link href="/terms" className="block text-sage-300 hover:text-sand-200 transition-colors">
                  Telemedicine Consent (NMC 2020)
                </Link>
                <Link href="/privacy" className="block text-sage-300 hover:text-sand-200 transition-colors">
                  Privacy Policy (DPDP Act 2023)
                </Link>
                <Link href="/pricing#refunds" className="block text-sage-300 hover:text-sand-200 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400 gap-4">
          <p>© {new Date().getFullYear()} DermaCare Practice Management. All rights reserved.</p>
          <p className="text-[11px] text-sage-400">
            Compliant with Indian National Medical Commission (NMC) Telemedicine Practice Guidelines & DPDP Act 2023.
          </p>
        </div>
      </div>
    </footer>
  );
}
