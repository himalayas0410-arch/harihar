import React from 'react';
import Link from 'next/link';
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
  UserCheck,
  Check,
  BadgeCheck,
} from 'lucide-react';
import { fallbackDoctor, fallbackServices } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function HomePage() {
  const doctor = fallbackDoctor;
  const services = fallbackServices;

  const testimonials = [
    {
      name: 'Priyanka Sen',
      city: 'Mumbai',
      condition: 'Adult Hormonal Acne',
      rating: 5,
      date: 'Consulted Oct 2026',
      quote:
        'I had spent 2 years jumping between over-the-counter serums that wrecked my skin barrier. Dr. Harihar Sharma accurately diagnosed my hormonal papulopustular acne during our video call. Within 6 weeks of starting his prescribed topical retinoid and barrier regimen, my skin cleared up completely.',
    },
    {
      name: 'Aditya Kulkarni',
      city: 'Pune',
      condition: 'Post-Dengue Hair Fall & Dandruff',
      rating: 5,
      date: 'Consulted Sep 2026',
      quote:
        'After recovering from dengue, I was losing clumps of hair daily. Dr. Harihar explained acute telogen effluvium with so much reassurance, guided my blood panel, and gave an evidence-based peptide routine. The digital prescription was accepted by Apollo Pharmacy within 10 minutes.',
    },
    {
      name: 'Meera Chhabra',
      city: 'New Delhi',
      condition: 'Epidermal Melasma & Tanning',
      rating: 5,
      date: 'Consulted Oct 2026',
      quote:
        'Best dermatology consultation I have had. He spent a full 25 minutes reviewing my previous steroid creams and explained why they were causing rebound hyperpigmentation. His strict sunscreen guidance and tyrosinase inhibitor plan gave visible lightening without irritation.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 bg-[#FAF8F5]">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-ivory-200/80 via-ivory-100/60 to-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Text & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/5 border border-forest-800/15 text-forest-900 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>NMC Registered • AIIMS Senior Residency • 11+ Years Post-PG</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-950 leading-[1.12]">
                Clear, Healthy Skin with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-800 via-forest-600 to-sage-600">
                  Evidence-Based
                </span>{' '}
                Dermatology
              </h1>

              {/* Clinical Mission Statement */}
              <p className="text-base sm:text-lg text-forest-900/75 leading-relaxed max-w-2xl font-normal">
                Consult senior dermatologist <strong className="text-forest-950 font-bold">Dr. Harihar Sharma</strong> from anywhere in India. Get direct clinical diagnosis for acne, hair thinning, melasma, and eczema with official, doctor-approved digital prescriptions valid nationwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 active:bg-forest-950 rounded-2xl shadow-xl shadow-forest-950/20 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-sand-300" />
                  <span>Book Online Consultation</span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-forest-900 hover:text-forest-950 bg-white hover:bg-ivory-200 border border-ivory-300 rounded-2xl transition-all shadow-sm"
                >
                  <span>View Services & Fees</span>
                  <ChevronRight className="w-4 h-4 text-sage-500" />
                </Link>
              </div>

              {/* Practice Highlights Pills */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-ivory-300 max-w-xl">
                <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-ivory-300/80 space-y-1">
                  <p className="text-[11px] font-semibold text-sage-700">Availability</p>
                  <p className="text-xs sm:text-sm font-bold text-forest-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Slots Today (IST)
                  </p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-ivory-300/80 space-y-1">
                  <p className="text-[11px] font-semibold text-sage-700">Video Platform</p>
                  <p className="text-xs sm:text-sm font-bold text-forest-950">Meet / Zoom / WA</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-ivory-300/80 space-y-1">
                  <p className="text-[11px] font-semibold text-sage-700">Prescription</p>
                  <p className="text-xs sm:text-sm font-bold text-forest-950">Official PDF Rx</p>
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Doctor Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-forest-400/20 via-sage-300/30 to-sand-400/20 rounded-[32px] blur-2xl transform -rotate-1"></div>

                <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-premium border border-ivory-300 space-y-5">
                  {/* Status & Rating Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Consultations Open Today
                    </span>
                    <span className="text-xs font-bold text-forest-900 flex items-center gap-1 bg-ivory-100 px-2.5 py-1 rounded-full border border-ivory-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 (1.2k+ reviews)
                    </span>
                  </div>

                  {/* Doctor Portrait Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-200 shadow-inner">
                    <img
                      src={doctor.profileImageUrl}
                      alt={doctor.fullName}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating credential pill */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-ivory-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-forest-950">
                        <Award className="w-4 h-4 text-forest-700 shrink-0" />
                        <span>MD Dermatology (AIIMS)</span>
                      </div>
                      <span className="text-[11px] font-semibold text-sage-700">
                        11+ Yrs Post-PG
                      </span>
                    </div>
                  </div>

                  {/* Doctor Bio & Verified Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-extrabold text-forest-950">{doctor.fullName}</h3>
                        <BadgeCheck className="w-5 h-5 text-forest-700" />
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 bg-forest-50 text-forest-800 font-bold rounded-full border border-forest-200">
                        Senior Consultant
                      </span>
                    </div>

                    <p className="text-xs text-sage-700 font-medium">
                      Reg. No: <strong className="text-forest-950">{doctor.nmcRegistrationNumber}</strong> ({doctor.stateMedicalCouncil})
                    </p>

                    {/* Specialization Chips (Clean grid, no awkward wrapping) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Acne & Scarring', 'Hair Fall & PRP', 'Melasma & Pigmentation', 'Eczema Relief'].map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold text-forest-900 bg-ivory-100 hover:bg-forest-50 px-2.5 py-1 rounded-lg border border-ivory-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-forest-900/75 leading-relaxed pt-1">
                      Evidence-based clinical protocols with zero steroid abuse. Patient-tailored skincare and medical therapy.
                    </p>
                  </div>

                  {/* Consultation Pricing & Action Bar */}
                  <div className="pt-4 border-t border-ivory-200 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] text-sage-600 font-semibold uppercase tracking-wider">
                        Consultation Fee
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-2xl font-extrabold text-forest-950">
                          {formatINR(doctor.consultationFeePaise)}
                        </p>
                        <span className="text-[10px] text-sage-600 font-medium">(GST incl.)</span>
                      </div>
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 active:bg-forest-950 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Book Video Slot</span>
                      <ArrowRight className="w-4 h-4 text-sand-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & RECOGNITION (Full responsive spacing) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-forest-950 text-ivory-100 rounded-3xl p-8 lg:p-10 shadow-xl border border-forest-900">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-sand-300">11+ Yrs</p>
            <p className="text-xs sm:text-sm text-sage-300 font-medium">Post-PG Clinical Practice</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-sand-300">15,000+</p>
            <p className="text-xs sm:text-sm text-sage-300 font-medium">Successful Consultations</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-sand-300 flex items-center justify-center sm:justify-start gap-1">
              4.9 <Star className="w-5 h-5 fill-sand-300 text-sand-300 inline" />
            </p>
            <p className="text-xs sm:text-sm text-sage-300 font-medium">Patient Satisfaction Score</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-sand-300">100%</p>
            <p className="text-xs sm:text-sm text-sage-300 font-medium">NMC Telemedicine Compliant</p>
          </div>
        </div>
      </section>

      {/* 3. DERMATOLOGY SERVICES & PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
            Clinical Consultations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            Specialized Care for Your Unique Skin & Hair Goals
          </h2>
          <p className="text-forest-900/75 text-sm sm:text-base">
            Transparent pricing in Indian Rupees. Every appointment includes comprehensive symptom evaluation, digital prescription, and diet/routine advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 bg-forest-50 border border-forest-200 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    {service.durationMinutes} mins
                  </span>
                  <p className="text-2xl font-extrabold text-forest-950">
                    {formatINR(service.priceInPaise)}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-forest-900/70 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-3 border-t border-ivory-200 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-forest-900">
                    Included in this consultation:
                  </p>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-forest-900/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/book?service=${service.slug}`}
                className="w-full py-3.5 text-center text-xs font-bold text-forest-900 hover:text-white bg-forest-50 hover:bg-forest-900 border border-forest-200 rounded-xl transition-all shadow-sm"
              >
                Select & Book Slot
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW ONLINE CONSULTATION WORKS */}
      <section className="bg-ivory-200/60 py-20 border-y border-ivory-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
              Seamless Patient Journey
            </span>
            <h2 className="text-3xl font-extrabold text-forest-950">
              How Your Online Dermatology Consult Works
            </h2>
            <p className="text-forest-900/75 text-sm">
              From appointment booking to pharmacy prescription in 4 simple, transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-ivory-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-900 font-extrabold flex items-center justify-center text-lg">
                01
              </div>
              <h4 className="text-base font-bold text-forest-950">Select Slot & Concern</h4>
              <p className="text-xs text-forest-900/70 leading-relaxed">
                Choose your condition (Acne, Hair, Rash) and select an available time slot in Indian Standard Time (IST).
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-ivory-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-900 font-extrabold flex items-center justify-center text-lg">
                02
              </div>
              <h4 className="text-base font-bold text-forest-950">Intake & Razorpay</h4>
              <p className="text-xs text-forest-900/70 leading-relaxed">
                Provide brief history, upload close-up skin photos, and pay via UPI, Card, or Net Banking with automated receipt.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-ivory-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-900 font-extrabold flex items-center justify-center text-lg">
                03
              </div>
              <h4 className="text-base font-bold text-forest-950">Attend 1-on-1 Video</h4>
              <p className="text-xs text-forest-900/70 leading-relaxed">
                Join the private call directly via Google Meet, Zoom, or WhatsApp video link sent right to your phone & email.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-ivory-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-900 font-extrabold flex items-center justify-center text-lg">
                04
              </div>
              <h4 className="text-base font-bold text-forest-950">Sealed Digital Rx</h4>
              <p className="text-xs text-forest-900/70 leading-relaxed">
                Download your official doctor-signed PDF prescription with exact medication dosages and AM/PM skincare routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
            Clinical Outcomes
          </span>
          <h2 className="text-3xl font-extrabold text-forest-950">
            Real Patient Recoveries Across India
          </h2>
          <p className="text-forest-900/75 text-sm">
            Hear from patients treated for complex acne, hair loss, and pigmentation through DermaCare telemedicine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-ivory-300 shadow-premium flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-sage-600">{t.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-forest-900/80 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-forest-950">{t.name}</h4>
                  <p className="text-[11px] text-sage-700">{t.city}</p>
                </div>
                <span className="text-[11px] font-semibold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-200">
                  {t.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PRIVACY & DPDP ACT COMPLIANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-950 text-ivory-100 rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-900 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sand-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              Digital Personal Data Protection (DPDP) Act 2023 Compliant
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ivory-50">
              Your Clinical Records & Photographs Are Strictly Confidential
            </h3>
            <p className="text-sage-200 text-xs sm:text-sm leading-relaxed">
              We never share or publicly post skin photographs. All medical records, clinical notes, and photographs are stored in private encrypted S3 buckets with expiring access links, accessible exclusively to you and Dr. Harihar Sharma.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/privacy"
              className="px-5 py-3 text-xs font-bold text-ivory-100 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors text-center"
            >
              Read Privacy Policy
            </Link>
            <Link
              href="/book"
              className="px-6 py-3 text-xs font-bold text-forest-950 bg-sand-300 hover:bg-sand-200 rounded-xl shadow-md transition-colors text-center"
            >
              Book Confidential Consult
            </Link>
          </div>
        </div>
      </section>

      {/* 7. READY TO START CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950">
          Ready to Start Your Skin Recovery Journey?
        </h2>
        <p className="text-forest-900/75 text-sm sm:text-base">
          Don’t wait weeks for an in-clinic appointment. Schedule your private digital consultation today.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-2xl shadow-xl shadow-forest-950/20 transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5 text-sand-300" />
            Book Video Consultation Now
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hello%20DermaCare,%20I%20have%20a%20query%20about%20booking%20an%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-forest-900 bg-sage-100 hover:bg-sage-200 border border-sage-300 rounded-2xl transition-all"
          >
            <PhoneCall className="w-5 h-5 text-forest-700" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
