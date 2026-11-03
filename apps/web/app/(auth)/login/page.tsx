'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Lock, ArrowRight, Stethoscope, User } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const [phone, setPhone] = useState('+91 91234 56789');
  const [password, setPassword] = useState('Password@123');
  const [otp, setOtp] = useState('');
  const [useOtp, setUseOtp] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to DermaCare</h1>
          <p className="text-xs text-slate-500">Access your dermatology appointments and records</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => {
              setRole('PATIENT');
              setPhone('+91 91234 56789');
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'PATIENT' ? 'bg-white text-brand-700 shadow-sm' : ''
            }`}
          >
            <User className="w-3.5 h-3.5" /> Patient
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('DOCTOR');
              setPhone('+91 98765 43210');
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'DOCTOR' ? 'bg-white text-brand-700 shadow-sm' : ''
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" /> Dr. Harihar
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {!useOtp ? (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setUseOtp(true)}
                  className="text-[11px] text-brand-600 hover:underline"
                >
                  Login via OTP instead
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">6-Digit SMS OTP</label>
                <button
                  type="button"
                  onClick={() => setUseOtp(false)}
                  className="text-[11px] text-brand-600 hover:underline"
                >
                  Login via Password instead
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter 123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          <Link
            href={role === 'PATIENT' ? '/portal' : '/portal/doctor'}
            className="w-full py-3 inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
          >
            Sign In to {role === 'PATIENT' ? 'Patient Portal' : 'Doctor Console'}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          New patient?{' '}
          <Link href="/register" className="text-brand-600 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
