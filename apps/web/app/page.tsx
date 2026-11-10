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
  ArrowRight,
  Lock,
  PhoneCall,
  Stethoscope,
  ImageIcon,
  Sparkles,
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
      {/* 1. HERO SECTION (Matches Reference Mockup) */}
      <section className="relative pt-6 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-br from-[#F5F2EB] via-[#FAF8F5] to-[#E9EFEA]">
        {/* Organic botanical wave at bottom left */}
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-28 sm:h-36 pointer-events-none opacity-60 z-0">
          <svg viewBox="0 0 400 150" fill="none" className="w-full h-full">
            <path
              d="M0 150 C 120 150, 160 90, 240 80 C 310 70, 360 110, 400 130 L 400 150 L 0 150 Z"
              fill="#CFDDD3"
              opacity="0.6"
            />
            <path
              d="M0 150 C 80 150, 130 110, 200 110 C 270 110, 310 140, 350 150 Z"
              fill="#95A990"
              opacity="0.35"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Column: Headline, Trust Pill, Subtitle, CTAs & 4 Feature Icons */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4E9E2] border border-[#CAD5C8] text-forest-900 text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0" />
                <span>Evidence-Based • Personalized Care • Online Consultations</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-extrabold tracking-tight text-forest-950 leading-[1.12]">
                Expert Dermatology Care
                <br className="hidden sm:inline" />{' '}
                for Healthy, Radiant Skin
              </h1>

              {/* Mission Subtitle */}
              <p className="text-base sm:text-lg text-forest-900/80 leading-relaxed max-w-xl font-normal">
                Consult <strong className="text-forest-950 font-bold">Dr. Harihar Sharma, AIIMS MD</strong> for acne, hair fall, pigmentation, eczema and more — with safe, effective and evidence-based treatments, now online from anywhere in India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold text-ivory-50 bg-[#163528] hover:bg-[#11291F] active:bg-[#0B1E16] rounded-xl shadow-lg shadow-forest-950/20 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-sand-300" />
                  <span>Book Online Consultation</span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-forest-950 hover:text-forest-900 bg-white hover:bg-ivory-100 border border-ivory-300 rounded-xl transition-all shadow-sm"
                >
                  <span>View Services & Fees</span>
                  <ArrowRight className="w-4 h-4 text-forest-700" />
                </Link>
              </div>

              {/* 4 Bottom Feature Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-ivory-300/80 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-ivory-300 flex items-center justify-center text-forest-800 shadow-xs shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-forest-950 leading-tight">
                    Online<br />Consultations
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-ivory-300 flex items-center justify-center text-forest-800 shadow-xs shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-forest-950 leading-tight">
                    Digital<br />Prescriptions
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-ivory-300 flex items-center justify-center text-forest-800 shadow-xs shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-forest-950 leading-tight">
                    Treatment<br />Follow-ups
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-ivory-300 flex items-center justify-center text-forest-800 shadow-xs shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-forest-950 leading-tight">
                    Progress<br />Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Showcase with Arch, Plant, Cosmetics & 5 Floating Pills */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl select-none">
                <img
                  src="/hero-doctor-blend.png"
                  alt="Dr. Harihar Sharma (AIIMS MD Dermatology) with clinical treatments"
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
                />

                {/* Desktop Interactive Clickable Hotspots overlaying the 5 pills */}
                <div className="hidden sm:block">
                  {/* 1. Acne & Scarring */}
                  <Link
                    href="/services#acne"
                    title="Acne & Acne Scars Consultation"
                    className="absolute top-[8%] right-[2%] w-[38%] h-[15%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                    aria-label="Acne & Scarring Service"
                  />
                  {/* 2. Hair Fall & PRP */}
                  <Link
                    href="/services#hair"
                    title="Hair Fall & Trichology Assessment"
                    className="absolute top-[25%] right-[2%] w-[38%] h-[15%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                    aria-label="Hair Fall & PRP Service"
                  />
                  {/* 3. Pigmentation */}
                  <Link
                    href="/services#pigmentation"
                    title="Melasma & Pigmentation Correction"
                    className="absolute top-[42%] right-[2%] w-[38%] h-[15%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                    aria-label="Pigmentation Service"
                  />
                  {/* 4. Eczema & Allergies */}
                  <Link
                    href="/services#eczema"
                    title="Eczema, Psoriasis & Allergy Relief"
                    className="absolute top-[59%] right-[2%] w-[38%] h-[15%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                    aria-label="Eczema & Allergies Service"
                  />
                  {/* 5. Skin Rejuvenation */}
                  <Link
                    href="/services#rejuvenation"
                    title="Skin Barrier Rejuvenation"
                    className="absolute top-[76%] right-[2%] w-[38%] h-[15%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                    aria-label="Skin Rejuvenation Service"
                  />
                </div>
              </div>

              {/* Mobile-Friendly Treatment Chips (for smaller screens) */}
              <div className="lg:hidden w-full pt-4">
                <p className="text-xs font-bold text-forest-900 mb-2">Clinical Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Acne & Scarring', slug: 'acne-and-acne-scars' },
                    { name: 'Hair Fall & PRP', slug: 'hair-fall-scalp-evaluation' },
                    { name: 'Pigmentation', slug: 'melasma-pigmentation' },
                    { name: 'Eczema & Allergies', slug: 'general-dermatology-eczema-rash' },
                    { name: 'Skin Rejuvenation', slug: 'skin-rejuvenation' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href="/services"
                      className="px-3 py-1.5 text-xs font-bold text-forest-950 bg-white border border-ivory-300 rounded-xl shadow-xs hover:bg-forest-50"
                    >
                      {item.name}
                    </Link>
                  ))}
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
