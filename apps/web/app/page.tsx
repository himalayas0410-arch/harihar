import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Calendar,
  Video,
  FileText,
  Star,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { fallbackDoctor, fallbackServices } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function HomePage() {
  const doctor = fallbackDoctor;
  const services = fallbackServices;

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>NMC Registered • AIIMS Alumnus • 11+ Years Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Clear, Healthy Skin with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-teal-500">
                  Evidence-Based
                </span>{' '}
                Dermatology
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Consult senior dermatologist <strong className="text-slate-900">Dr. Harihar Sharma</strong> from anywhere in India. Get direct clinical diagnosis for acne, hair thinning, pigmentation, and eczema with doctor-approved digital prescriptions valid nationwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  Book Video Consultation
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all"
                >
                  View Services & Pricing
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Availability</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Slots Today
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Platforms</p>
                  <p className="text-sm font-bold text-slate-800">Meet / Zoom / WA</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Prescription</p>
                  <p className="text-sm font-bold text-slate-800">Instant PDF Rx</p>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative background glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-400 to-teal-400 rounded-3xl blur-xl opacity-30 transform -rotate-1"></div>

                <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={doctor.profileImageUrl}
                      alt={doctor.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                      <Award className="w-4 h-4 text-brand-600" />
                      <span className="text-xs font-bold text-slate-800">MD Dermatology (AIIMS)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">{doctor.fullName}</h3>
                      <span className="text-xs px-2.5 py-1 bg-brand-50 text-brand-700 font-semibold rounded-md border border-brand-200">
                        Senior Consultant
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Reg. No: <strong className="text-slate-700">{doctor.nmcRegistrationNumber}</strong> ({doctor.stateMedicalCouncil})
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      Specialized in targeted anti-acne regimens, androgenetic alopecia hair restoration, and pigmentary disorders.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Consultation Fee</p>
                      <p className="text-lg font-extrabold text-brand-700">
                        {formatINR(doctor.consultationFeePaise)}
                      </p>
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 rounded-lg transition-colors"
                    >
                      Book Slot <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & RECOGNITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 text-white rounded-3xl p-8 lg:p-10 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-400">11+ Yrs</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Clinical Experience</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-400">15,000+</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Patients Treated</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-400 flex items-center justify-center sm:justify-start gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Patient Satisfaction</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-400">100%</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">NMC Guideline Compliant</p>
          </div>
        </div>
      </section>

      {/* 3. DERMATOLOGY SERVICES & PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Care for Your Unique Skin & Hair Goals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Transparent pricing in Indian Rupees. Every appointment includes comprehensive symptom evaluation, digital prescription, and diet/routine advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {service.durationMinutes} mins
                  </span>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {formatINR(service.priceInPaise)}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Included in this consult:
                  </p>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/book?service=${service.slug}`}
                className="w-full py-3 text-center text-xs font-bold text-brand-700 hover:text-white bg-brand-50 hover:bg-brand-600 border border-brand-200 rounded-xl transition-all"
              >
                Select & Book Slot
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-3 py-1 rounded-full">
              Seamless Patient Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              How Your Online Dermatology Consult Works
            </h2>
            <p className="text-slate-600 text-sm">
              From appointment booking to pharmacy prescription in 4 simple, transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-lg">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900">Select Slot & Service</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose your clinical concern (Acne, Hair, Rash) and select an available time in Indian Standard Time (IST).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-lg">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900">Pay via Razorpay</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete instant, 100% secure payment via UPI, Google Pay, Credit/Debit card, or Net Banking with automated receipt.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-lg">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900">Attend 1-on-1 Video</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Join the private call directly via Google Meet, Zoom, or WhatsApp video link sent right to your phone & email.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-lg">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900">Get Digital Prescription</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Download your official doctor-signed PDF prescription with exact medication dosages and AM/PM skincare routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIVACY & DPDP ACT COMPLIANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-brand-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              Digital Personal Data Protection (DPDP) Act 2023 Compliant
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Your Clinical Records & Photographs Are Strictly Confidential
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We never share or publicly post skin photographs. All medical records, clinical notes, and photographs are stored in private encrypted S3 buckets with expiring access links, accessible exclusively to you and Dr. Harihar Sharma.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/privacy"
              className="px-5 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors text-center"
            >
              Read Privacy Policy
            </Link>
            <Link
              href="/book"
              className="px-6 py-3 text-xs font-bold text-slate-900 bg-brand-400 hover:bg-brand-300 rounded-xl shadow-md transition-colors text-center"
            >
              Book Confidential Consult
            </Link>
          </div>
        </div>
      </section>

      {/* 6. READY TO START CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Ready to Start Your Skin Recovery Journey?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Don’t wait weeks for an in-clinic appointment. Schedule your private digital consultation today.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Book Video Consultation Now
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hello%20DermaCare,%20I%20have%20a%20query%20about%20booking%20an%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all"
          >
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
