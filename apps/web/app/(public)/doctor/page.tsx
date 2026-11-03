import React from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Building,
  Clock,
  Sparkles,
} from 'lucide-react';
import { fallbackDoctor } from '@/lib/api';

export default function DoctorProfilePage() {
  const doctor = fallbackDoctor;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#FAF8F5]">
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl border border-ivory-300 p-8 sm:p-12 shadow-premium space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden shrink-0 bg-ivory-200 shadow-md">
            <img
              src={doctor.profileImageUrl}
              alt={doctor.fullName}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3 py-1 rounded-full">
                Registered Medical Practitioner (RMP)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950">
                {doctor.fullName}
              </h1>
              <p className="text-base text-forest-800 font-bold">
                {doctor.qualificationString}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-sage-800 bg-ivory-100 p-4 rounded-2xl border border-ivory-200">
              <div>
                <p className="text-sage-600 font-medium">NMC Registration No.</p>
                <p className="font-bold text-forest-950">{doctor.nmcRegistrationNumber}</p>
              </div>
              <div>
                <p className="text-sage-600 font-medium">State Medical Council</p>
                <p className="font-bold text-forest-950">{doctor.stateMedicalCouncil}</p>
              </div>
              <div>
                <p className="text-sage-600 font-medium">Clinical Experience</p>
                <p className="font-bold text-forest-950">{doctor.experienceYears}+ Years Post-PG</p>
              </div>
              <div>
                <p className="text-sage-600 font-medium">Primary Alma Mater</p>
                <p className="font-bold text-forest-950">AIIMS, New Delhi</p>
              </div>
            </div>

            <p className="text-sm text-forest-900/80 leading-relaxed">
              {doctor.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 text-sand-300" />
                Book Video Appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-forest-900 bg-ivory-200 hover:bg-ivory-300 rounded-xl transition-all"
              >
                View Dermatology Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications & Medical Residency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="flex items-center gap-3 text-forest-800">
            <GraduationCap className="w-6 h-6" />
            <h3 className="text-xl font-bold text-forest-950">Medical Qualifications</h3>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-forest-600 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-forest-950">
                MD — Dermatology, Venereology & Leprosy
              </h4>
              <p className="text-xs text-forest-800 font-medium">All India Institute of Medical Sciences (AIIMS)</p>
              <p className="text-xs text-sage-600 leading-relaxed">Residency in clinical trichology, inflammatory dermatoses, and dermatopathology.</p>
            </div>

            <div className="border-l-2 border-forest-600 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-forest-950">
                MBBS (Bachelor of Medicine & Bachelor of Surgery)
              </h4>
              <p className="text-xs text-forest-800 font-medium">AIIMS, New Delhi</p>
              <p className="text-xs text-sage-600 leading-relaxed">Graduated with academic distinction; rotating clinical internship.</p>
            </div>

            <div className="border-l-2 border-forest-600 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-forest-950">
                Certificate in Telemedicine Practice
              </h4>
              <p className="text-xs text-forest-800 font-medium">National Medical Commission (NMC) Recognized Module</p>
              <p className="text-xs text-sage-600 leading-relaxed">Certified in ethical digital clinical diagnosis and health data privacy.</p>
            </div>
          </div>
        </div>

        {/* Clinical Focus Areas */}
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="flex items-center gap-3 text-forest-800">
            <Sparkles className="w-6 h-6 text-sand-500" />
            <h3 className="text-xl font-bold text-forest-950">Core Clinical Focus</h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {doctor.specialties.map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-ivory-100 border border-ivory-200 text-xs font-semibold text-forest-950"
              >
                <CheckCircle className="w-4 h-4 text-forest-700 shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Philosophy */}
      <div className="bg-forest-950 text-ivory-100 rounded-3xl p-8 sm:p-10 space-y-4 border border-forest-900">
        <h3 className="text-2xl font-bold text-ivory-50">Clinical Philosophy: Evidence Over Hype</h3>
        <p className="text-sm text-sage-200 leading-relaxed">
          "In the era of social media skincare advice and unverified home remedies, skin barriers are frequently damaged by aggressive over-the-counter acids and steroids. My clinical goal is to offer clear, scientific diagnosis, prescribing targeted active ingredients in exact therapeutic concentrations while protecting the skin's natural microbiome and moisture barrier."
        </p>
        <p className="text-xs text-sand-300 font-semibold">— Dr. Harihar Sharma</p>
      </div>
    </div>
  );
}
