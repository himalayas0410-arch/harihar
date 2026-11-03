'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  Upload,
  Download,
  ShieldCheck,
  User,
  Plus,
  CheckCircle,
  ExternalLink,
  ImageIcon,
  RefreshCw,
  XCircle,
  CreditCard,
  AlertTriangle,
  ChevronRight,
  Heart,
  Eye,
  Columns,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { fallbackDoctor } from '@/lib/api';

export default function PatientPortalPage() {
  const doctor = fallbackDoctor;
  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'consultations' | 'prescriptions' | 'records' | 'progress' | 'payments' | 'profile'
  >('overview');

  // Patient profile state
  const [profile, setProfile] = useState({
    fullName: 'Rohit Mehta',
    phoneNumber: '+91 91234 56789',
    email: 'rohit.mehta@example.com',
    dob: '1996-08-15',
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: 'Penicillin (mild urticaria)',
    chronicConditions: 'None',
    emergencyContact: 'Mrs. Neha Mehta (+91 98220 11223)',
  });

  // Appointments
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-01',
      appointmentNumber: 'DC-202611-8912',
      serviceName: 'Acne & Acne Scars Consultation',
      doctorName: 'Dr. Harihar Sharma',
      date: 'Nov 6, 2026',
      timeIST: '11:00 AM - 11:25 AM IST',
      status: 'CONFIRMED',
      provider: 'GOOGLE_MEET',
      meetingUrl: 'https://meet.google.com/derm-dc2026118912',
      feePaise: 99900,
    },
    {
      id: 'apt-02',
      appointmentNumber: 'DC-202610-4102',
      serviceName: 'General Dermatology & Rash Assessment',
      doctorName: 'Dr. Harihar Sharma',
      date: 'Oct 15, 2026',
      timeIST: '04:30 PM - 04:50 PM IST',
      status: 'COMPLETED',
      provider: 'GOOGLE_MEET',
      meetingUrl: 'https://meet.google.com/derm-dc2026104102',
      feePaise: 89900,
    },
  ]);

  // Consultations
  const consultations = [
    {
      id: 'c-01',
      date: 'Oct 15, 2026',
      doctorName: 'Dr. Harihar Sharma (AIIMS, New Delhi)',
      serviceType: 'Initial Dermatology Assessment',
      symptoms: 'Inflammatory pustules and closed comedones on cheeks for 4 months, aggravated by hot weather.',
      diagnosis: 'Acne Vulgaris (Grade II - Papulopustular) with Post-Inflammatory Erythema (PIE)',
      clinicalNotes: 'Skin barrier intact with mild erythema. Advised against physical scrubs. Strict photoprotection emphasized.',
      treatmentPlan: 'Nightly topical Adapalene 0.1% + Benzoyl Peroxide 2.5% gel. Morning 15% Azelaic acid on red spots. Broad-spectrum SPF 50 sunscreen.',
      prescriptionRef: 'RX-202610-3819',
      followUpRecommendation: 'Treatment review after 4 weeks (Nov 15, 2026).',
    },
  ];

  // Prescriptions
  const prescriptions = [
    {
      id: 'rx-01',
      prescriptionNumber: 'RX-202610-3819',
      date: 'Oct 15, 2026',
      doctorName: 'Dr. Harihar Sharma',
      nmcReg: 'NMC/MCI/2015/78412',
      diagnosis: 'Acne Vulgaris (Grade II) with Post-Inflammatory Erythema',
      items: [
        {
          name: 'Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel',
          form: 'GEL',
          dosage: '1 pea-sized amount',
          frequency: 'Once daily at bedtime',
          duration: '30 Days',
          instructions: 'Apply thin layer on dry clean skin 15 minutes after washing. Avoid eyes and mouth angles.',
        },
        {
          name: 'Azelaic Acid 15% Gel',
          form: 'GEL',
          dosage: '1 fingertip unit',
          frequency: 'Once daily in the morning',
          duration: '30 Days',
          instructions: 'Apply onto post-inflammatory red spots. Follow with moisturizer.',
        },
        {
          name: 'Ceramide + Hyaluronic Barrier Moisturizing Lotion',
          form: 'LOTION',
          dosage: '2 pumps',
          frequency: 'Twice daily',
          duration: 'Continuous',
          instructions: 'Apply to damp face to maintain skin barrier integrity.',
        },
        {
          name: 'SPF 50+ PA++++ Broad Spectrum Silicone Sunscreen Gel',
          form: 'SUNSCREEN',
          dosage: 'Two-finger rule',
          frequency: 'Every morning, reapply if outdoors',
          duration: 'Continuous',
          instructions: 'Crucial to prevent UV-induced darkening of acne marks.',
        },
      ],
      signatureHash: '9b2c34d8ef1092a487cb119034aa109b827e8199201a9c339ef182a1048b',
    },
  ];

  // Skin Progress Photos
  const [progressPhotos, setProgressPhotos] = useState([
    {
      id: 'prog-1',
      date: 'Oct 15, 2026',
      label: 'Week 0 (Baseline)',
      bodyArea: 'Right Cheek',
      description: 'Multiple active papules and redness prior to starting Adapalene.',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'prog-2',
      date: 'Nov 02, 2026',
      label: 'Week 2.5 Follow-up',
      bodyArea: 'Right Cheek',
      description: 'Active pustules flattened. Red marks fading, zero peeling noticed.',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    },
  ]);

  // Medical Records & Uploads
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 'rec-1',
      title: 'Complete Blood Count (CBC) & Serum Ferritin',
      type: 'LAB_REPORT',
      date: 'Sep 28, 2026',
      size: '1.4 MB',
    },
    {
      id: 'rec-2',
      title: 'Prior Prescription from Local Clinic (Steroid Cream)',
      type: 'PRIOR_PRESCRIPTION',
      date: 'Aug 10, 2026',
      size: '2.1 MB',
    },
  ]);

  // Payments
  const payments = [
    {
      id: 'pay-01',
      receiptNumber: 'RCP-DC-202611-8912',
      date: 'Nov 04, 2026',
      amountPaise: 99900,
      status: 'CAPTURED',
      method: 'UPI (Google Pay)',
      appointmentRef: 'DC-202611-8912',
    },
    {
      id: 'pay-02',
      receiptNumber: 'RCP-DC-202610-4102',
      date: 'Oct 15, 2026',
      amountPaise: 89900,
      status: 'CAPTURED',
      method: 'HDFC Credit Card',
      appointmentRef: 'DC-202610-4102',
    },
  ];

  // Selected prescription modal / preview
  const [selectedRx, setSelectedRx] = useState<any>(prescriptions[0]);
  const [compareMode, setCompareMode] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF8F5]">
      {/* Patient Header Card */}
      <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 text-ivory-100 font-extrabold flex items-center justify-center text-2xl shadow-md">
            {profile.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-forest-950">{profile.fullName}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-50 text-forest-800 px-2 py-0.5 rounded border border-forest-200">
                Verified Patient
              </span>
            </div>
            <p className="text-xs text-sage-700">
              {profile.phoneNumber} • {profile.email} • Age: 28 ({profile.gender})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/book"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-sand-300" /> Book New Consultation
          </Link>
        </div>
      </div>

      {/* Navigation Tabs (All 8 Patient Sections) */}
      <div className="flex overflow-x-auto gap-1 border-b border-ivory-300 pb-px text-xs font-bold scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Heart },
          { id: 'appointments', label: 'My Appointments', icon: Calendar },
          { id: 'consultations', label: 'My Consultations', icon: FileText },
          { id: 'prescriptions', label: 'My Prescriptions', icon: Download },
          { id: 'progress', label: 'My Skin Progress', icon: ImageIcon },
          { id: 'records', label: 'My Medical Records', icon: Upload },
          { id: 'payments', label: 'My Payments', icon: CreditCard },
          { id: 'profile', label: 'My Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-white text-forest-900 border-t-2 border-x border-forest-800 border-b-transparent shadow-sm'
                  : 'text-sage-700 hover:text-forest-900 hover:bg-ivory-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-forest-700' : 'text-sage-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. OVERVIEW TAB */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Alert */}
          <div className="bg-gradient-to-r from-forest-950 to-forest-900 text-ivory-100 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sand-300">
                Welcome back, {profile.fullName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">Your Next Consultation: Nov 6, 2026</h2>
              <p className="text-xs text-sage-200">
                Dr. Harihar Sharma • Acne & Acne Scars Consultation • 11:00 AM IST
              </p>
            </div>
            <a
              href="https://meet.google.com/derm-dc2026118912"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-forest-950 bg-sand-300 hover:bg-sand-200 rounded-xl shadow-md transition-all shrink-0"
            >
              <Video className="w-4 h-4" /> Join Video Consultation
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Latest Prescription Card */}
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 shadow-premium space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-forest-950">Latest Prescription</h3>
                <span className="text-[10px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded">
                  {prescriptions[0].prescriptionNumber}
                </span>
              </div>
              <p className="text-xs text-sage-700 font-medium">{prescriptions[0].diagnosis}</p>
              <div className="space-y-1.5 text-xs text-forest-900">
                {prescriptions[0].items.slice(0, 2).map((item, i) => (
                  <p key={i} className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-600"></span>
                    <span className="font-semibold">{item.name}</span>
                  </p>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('prescriptions')}
                className="pt-2 text-xs font-bold text-forest-700 hover:underline flex items-center gap-1"
              >
                View Full Regimen & PDF <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Skin Progress Quick View */}
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 shadow-premium space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-forest-950">Skin Progress</h3>
                <span className="text-[10px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded">
                  2 Photos Recorded
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {progressPhotos.map((p) => (
                  <div key={p.id} className="space-y-1">
                    <div className="aspect-square rounded-xl overflow-hidden bg-ivory-200">
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-semibold text-forest-950 truncate">{p.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('progress')}
                className="pt-2 text-xs font-bold text-forest-700 hover:underline flex items-center gap-1"
              >
                Compare Side-by-Side <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Follow-up Reminder */}
            <div className="bg-white rounded-3xl border border-ivory-300 p-6 shadow-premium space-y-4">
              <h3 className="text-sm font-bold text-forest-950">Follow-up Recommendation</h3>
              <div className="p-3.5 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-sage-800 space-y-1">
                <p className="font-bold text-forest-950">Dr. Harihar Sharma advised:</p>
                <p>"Review skin tolerance to Adapalene after 4 weeks. Book a follow-up review."</p>
              </div>
              <Link
                href="/book?service=follow-up-consultation"
                className="w-full py-2.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-200 rounded-xl transition-all"
              >
                Book Follow-up Review (₹599)
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MY APPOINTMENTS TAB */}
      {/* ======================================================== */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-forest-950">Your Scheduled Consultations</h2>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-ivory-50 bg-forest-900 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" /> Book Another Slot
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-3xl border border-ivory-300 p-6 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest-950">{apt.appointmentNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        apt.status === 'CONFIRMED'
                          ? 'bg-forest-100 text-forest-800 border border-forest-200'
                          : 'bg-ivory-200 text-sage-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forest-950">{apt.serviceName}</h3>
                  <p className="text-xs text-sage-700">Doctor: {apt.doctorName}</p>
                  <div className="flex items-center gap-4 text-xs text-forest-900">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sage-500" /> {apt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sage-500" /> {apt.timeIST}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {apt.status === 'CONFIRMED' && (
                    <>
                      <a
                        href={apt.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
                      >
                        <Video className="w-4 h-4 text-sand-300" /> Join Call
                      </a>
                      <button
                        type="button"
                        onClick={() => alert('Appointment reschedule request forwarded to clinic coordination desk.')}
                        className="px-3.5 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900 bg-ivory-100 rounded-xl"
                      >
                        Reschedule
                      </button>
                      <button
                        type="button"
                        onClick={() => alert('Cancellation policy: Eligible for 100% refund up to 2 hours before the slot.')}
                        className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {apt.status === 'COMPLETED' && (
                    <button
                      onClick={() => setActiveTab('prescriptions')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-forest-900 bg-ivory-200 rounded-xl"
                    >
                      <FileText className="w-4 h-4 text-forest-700" /> View Issued Prescription
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MY CONSULTATIONS TAB */}
      {/* ======================================================== */}
      {activeTab === 'consultations' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-forest-950">Detailed Consultation & Clinical History</h2>

          {consultations.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-ivory-200">
                <div>
                  <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">{c.date}</span>
                  <h3 className="text-xl font-bold text-forest-950 mt-0.5">{c.serviceType}</h3>
                  <p className="text-xs text-sage-700">Attending Dermatologist: {c.doctorName}</p>
                </div>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-forest-900 bg-forest-50 border border-forest-200 rounded-xl"
                >
                  <FileText className="w-4 h-4 text-forest-700" /> View Prescription ({c.prescriptionRef})
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-sage-600 uppercase text-[10px]">Reported Symptoms</p>
                  <p className="text-forest-900 leading-relaxed">{c.symptoms}</p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-sage-600 uppercase text-[10px]">Doctor's Diagnosis</p>
                  <p className="font-bold text-forest-950 text-sm">{c.diagnosis}</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <p className="font-bold text-sage-600 uppercase text-[10px]">Clinical Notes & Assessment</p>
                  <p className="text-forest-900 leading-relaxed bg-ivory-100 p-3.5 rounded-xl border border-ivory-200">
                    {c.clinicalNotes}
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <p className="font-bold text-sage-600 uppercase text-[10px]">Treatment Plan & Regimen</p>
                  <p className="text-forest-900 leading-relaxed">{c.treatmentPlan}</p>
                </div>

                <div className="space-y-1 md:col-span-2 pt-2 border-t border-ivory-200 flex items-center justify-between">
                  <span className="text-xs text-sage-700 font-medium">
                    Follow-up: <strong className="text-forest-950">{c.followUpRecommendation}</strong>
                  </span>
                  <Link
                    href="/book?service=follow-up-consultation"
                    className="text-xs font-bold text-forest-700 hover:underline"
                  >
                    Schedule Recommended Follow-Up
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MY PRESCRIPTIONS TAB (WITH NMC PDF FORMAT) */}
      {/* ======================================================== */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-forest-950">Digital Prescriptions</h2>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-forest-900 bg-white border border-ivory-300 rounded-xl hover:bg-ivory-200"
            >
              <Download className="w-4 h-4 text-forest-700" /> Print / Save Official PDF
            </button>
          </div>

          {/* Printable Official Medical Prescription Box */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 sm:p-10 shadow-premium space-y-8">
            {/* Header: Doctor Registration Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-forest-900">
              <div>
                <h3 className="text-2xl font-bold text-forest-950">{doctor.fullName}</h3>
                <p className="text-xs text-forest-800 font-semibold">{doctor.qualificationString}</p>
                <p className="text-xs text-sage-700">
                  NMC Registration Number: <strong>{doctor.nmcRegistrationNumber}</strong> ({doctor.stateMedicalCouncil})
                </p>
                <p className="text-[11px] text-sage-600">Telemedicine Practice Clinic, New Delhi & Online</p>
              </div>

              <div className="text-right sm:text-right text-xs text-sage-700 space-y-1">
                <span className="inline-block px-3 py-1 rounded bg-forest-50 text-forest-900 font-mono font-bold text-sm border border-forest-200">
                  {selectedRx.prescriptionNumber}
                </span>
                <p>Date: {selectedRx.date}</p>
                <p>Validity: 30 Days from issue</p>
              </div>
            </div>

            {/* Patient Demographics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-ivory-100 border border-ivory-200 text-xs">
              <div>
                <p className="text-sage-600">Patient Name:</p>
                <p className="font-bold text-forest-950">{profile.fullName}</p>
              </div>
              <div>
                <p className="text-sage-600">Age / Gender:</p>
                <p className="font-bold text-forest-950">28 Yrs / {profile.gender}</p>
              </div>
              <div>
                <p className="text-sage-600">Mobile:</p>
                <p className="font-bold text-forest-950">{profile.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sage-600">Allergies:</p>
                <p className="font-bold text-rose-700">{profile.allergies}</p>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600">Diagnosis</span>
              <p className="text-sm font-bold text-forest-950">{selectedRx.diagnosis}</p>
            </div>

            {/* Rx Medication Table */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600 flex items-center gap-1.5">
                <span className="text-forest-900 font-extrabold text-lg">℞</span> Prescribed Medications
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-ivory-300 rounded-2xl overflow-hidden">
                  <thead className="bg-forest-950 text-ivory-100 font-bold">
                    <tr>
                      <th className="p-3.5">Medicine Name / Formulation</th>
                      <th className="p-3.5">Dosage / Form</th>
                      <th className="p-3.5">Frequency</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Clinical Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200 bg-white">
                    {selectedRx.items.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="p-3.5 font-bold text-forest-950">{item.name}</td>
                        <td className="p-3.5 text-sage-800">{item.dosage} ({item.form})</td>
                        <td className="p-3.5 text-sage-800">{item.frequency}</td>
                        <td className="p-3.5 text-sage-800">{item.duration}</td>
                        <td className="p-3.5 text-forest-900 font-medium">{item.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sealed Digital Verification Hash */}
            <div className="pt-6 border-t border-ivory-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-forest-800">
                  <ShieldCheck className="w-4 h-4 text-forest-700" /> Digitally Signed & Sealed by Dr. Harihar Sharma
                </div>
                <p className="text-[10px] text-sage-600">
                  Issued electronically in accordance with Indian NMC Telemedicine Practice Guidelines (2020).
                </p>
                <p className="font-mono text-[9px] text-sage-500 truncate max-w-sm">
                  SHA-256 Seal: {selectedRx.signatureHash}
                </p>
              </div>

              <div className="text-right">
                <div className="w-36 h-12 border-b border-forest-800 flex items-end justify-center text-xs text-forest-900 font-serif italic pb-1">
                  Dr. Harihar Sharma
                </div>
                <p className="text-[10px] text-sage-600 mt-1">Authorized Medical Signatory</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MY SKIN PROGRESS (WITH BEFORE/AFTER COMPARISON) */}
      {/* ======================================================== */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-forest-950">My Skin Recovery Progress</h2>
              <p className="text-xs text-sage-700">
                Track how your skin responds to prescribed topicals over time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${
                  compareMode
                    ? 'bg-forest-900 text-ivory-50 border-forest-900'
                    : 'bg-white text-forest-900 border-ivory-300 hover:bg-ivory-200'
                }`}
              >
                <Columns className="w-4 h-4" /> {compareMode ? 'Show Individual Cards' : 'Compare Side-by-Side'}
              </button>

              <label className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl cursor-pointer">
                <Upload className="w-3.5 h-3.5" /> Upload New Photo
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {compareMode ? (
            /* Side-by-Side Comparison Tool */
            <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
              <h3 className="text-sm font-bold text-forest-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sand-500" /> Before vs. Current Progress Comparison (Right Cheek)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-sage-700">Before: Oct 15, 2026 (Baseline)</span>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-200">
                    <img src={progressPhotos[0].url} alt="Before" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-sage-800 italic">"{progressPhotos[0].description}"</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-forest-800">Current: Nov 02, 2026 (2.5 Weeks)</span>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-200">
                    <img src={progressPhotos[1].url} alt="Current" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-forest-950 font-medium">"{progressPhotos[1].description}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {progressPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-3xl border border-ivory-300 p-6 shadow-premium space-y-4"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-200">
                    <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-forest-950">{photo.label}</h4>
                      <span className="text-[10px] font-semibold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded border border-forest-200">
                        {photo.bodyArea}
                      </span>
                    </div>
                    <p className="text-[11px] text-sage-600">{photo.date}</p>
                    <p className="text-xs text-sage-800 pt-1 leading-relaxed">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. MY MEDICAL RECORDS TAB */}
      {/* ======================================================== */}
      {activeTab === 'records' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-base font-bold text-forest-950">Upload Medical Reports or Prior Prescriptions</h2>
              <p className="text-xs text-sage-700">
                Encrypted S3 bucket storage. Visible exclusively to you and Dr. Harihar Sharma.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl cursor-pointer">
              <Upload className="w-4 h-4" /> Upload Document
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {medicalRecords.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-ivory-300 p-5 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ivory-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-forest-700" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-forest-950">{r.title}</h4>
                    <p className="text-[11px] text-sage-600">{r.date} • {r.size}</p>
                    <span className="inline-block text-[10px] font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded">
                      {r.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-forest-700 hover:underline"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. MY PAYMENTS & RECEIPTS TAB */}
      {/* ======================================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-forest-950">Billing History & Tax Receipts</h2>

          <div className="bg-white rounded-3xl border border-ivory-300 overflow-hidden shadow-premium">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-100 text-forest-950 font-bold border-b border-ivory-300">
                <tr>
                  <th className="p-4">Receipt Number</th>
                  <th className="p-4">Appointment Ref</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="p-4 font-bold text-forest-950">{p.receiptNumber}</td>
                    <td className="p-4 text-sage-800">{p.appointmentRef}</td>
                    <td className="p-4 text-sage-800">{p.date}</td>
                    <td className="p-4 text-sage-800">{p.method}</td>
                    <td className="p-4 font-bold text-forest-950">{formatINR(p.amountPaise)}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => window.print()}
                        className="text-xs font-bold text-forest-700 hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. MY PROFILE TAB */}
      {/* ======================================================== */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Patient Profile & Health Details</h2>
            <p className="text-xs text-sage-700">Keep emergency contacts and allergies up-to-date.</p>
          </div>

          <form className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Gender</label>
                <input
                  type="text"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Blood Group</label>
                <input
                  type="text"
                  value={profile.bloodGroup}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Known Drug Allergies</label>
              <input
                type="text"
                value={profile.allergies}
                onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Emergency Contact Information</label>
              <input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert('Profile successfully updated!')}
                className="px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 rounded-xl"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
