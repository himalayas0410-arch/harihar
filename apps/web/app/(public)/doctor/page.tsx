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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-md">
            <img
              src={doctor.profileImageUrl}
              alt={doctor.fullName}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                Registered Medical Practitioner (RMP)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {doctor.fullName}
              </h1>
              <p className="text-base text-brand-700 font-bold">
                {doctor.qualificationString}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-slate-400 font-medium">NMC Registration No.</p>
                <p className="font-bold text-slate-900">{doctor.nmcRegistrationNumber}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">State Medical Council</p>
                <p className="font-bold text-slate-900">{doctor.stateMedicalCouncil}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Clinical Experience</p>
                <p className="font-bold text-slate-900">{doctor.experienceYears}+ Years Post-PG</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Primary Alma Mater</p>
                <p className="font-bold text-slate-900">AIIMS, New Delhi</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Video Appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                View Dermatology Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications & Medical Training */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3 text-brand-700">
            <GraduationCap className="w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-900">Medical Qualifications</h3>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-brand-500 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                MD — Dermatology, Venereology & Leprosy
              </h4>
              <p className="text-xs text-slate-500">All India Institute of Medical Sciences (AIIMS)</p>
              <p className="text-xs text-slate-400">Advanced residency in clinical trichology, inflammatory dermatoses, and dermatopathology.</p>
            </div>

            <div className="border-l-2 border-brand-500 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                MBBS (Bachelor of Medicine & Bachelor of Surgery)
              </h4>
              <p className="text-xs text-slate-500">AIIMS, New Delhi</p>
              <p className="text-xs text-slate-400">Graduated with academic distinction; rotating clinical internship.</p>
            </div>

            <div className="border-l-2 border-brand-500 pl-4 space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Certificate in Telemedicine Practice
              </h4>
              <p className="text-xs text-slate-500">National Medical Commission (NMC) Recognized Module</p>
              <p className="text-xs text-slate-400">Certified compliance in digital diagnosis, patient data handling, and prescription ethics.</p>
            </div>
          </div>
        </div>

        {/* Clinical Focus Areas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3 text-brand-700">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-900">Core Clinical Specialties</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {doctor.specialties.map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
              >
                <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Philosophy */}
      <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <h3 className="text-2xl font-bold">Clinical Philosophy: Evidence Over Hype</h3>
        <p className="text-sm text-brand-100 leading-relaxed">
          "In the era of social media skincare advice and unverified home remedies, skin barriers are frequently damaged by aggressive over-the-counter acids and steroids. My clinical goal is to offer clear, scientific diagnosis, prescribing targeted active ingredients in exact therapeutic concentrations while protecting the skin's natural microbiome and moisture barrier."
        </p>
        <p className="text-xs text-brand-300 font-semibold">— Dr. Harihar Sharma</p>
      </div>
    </div>
  );
}
