'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, User, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('MALE');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 bg-[#FAF8F5]">
      <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-ivory-100 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6 text-sand-300" />
          </div>
          <h1 className="text-2xl font-bold text-forest-950">Patient Registration</h1>
          <p className="text-xs text-sage-700">Create your confidential dermatology patient profile</p>
        </div>

        <form className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-forest-950 mb-1">Full Legal Name</label>
            <input
              type="text"
              placeholder="e.g. Ananya Sen"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Mobile Number (WhatsApp)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">Create Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-forest-700 rounded border-ivory-300"
            />
            <label htmlFor="consent" className="text-xs text-sage-800 leading-relaxed">
              I accept the Telemedicine Consultation Terms and agree to confidential health data storage under the Indian DPDP Act 2023.
            </label>
          </div>

          <Link
            href="/portal"
            className="w-full py-3 inline-flex items-center justify-center gap-2 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
          >
            Complete Registration & Access Portal
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </form>

        <div className="text-center text-xs text-sage-700 pt-2 border-t border-ivory-200">
          Already registered?{' '}
          <Link href="/login" className="text-forest-700 font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
