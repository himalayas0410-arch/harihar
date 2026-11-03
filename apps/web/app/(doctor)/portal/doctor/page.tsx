'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  CheckCircle,
  Plus,
  Trash2,
  ShieldCheck,
  Stethoscope,
  PhoneCall,
  Save,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  Users,
  Settings,
  ChevronRight,
  Eye,
  Check,
  X,
  AlertTriangle,
  History,
  Activity,
  Layers,
} from 'lucide-react';
import { fallbackDoctor, fallbackServices } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function DoctorPortalPage() {
  const doctor = fallbackDoctor;

  // Active view tab: 'dashboard' | 'appointments' | 'workspace' | 'patients' | 'availability' | 'timeline'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'workspace' | 'patients' | 'availability' | 'timeline'>('dashboard');

  // Practice Metrics
  const stats = {
    todayAppointments: 4,
    upcomingAppointments: 12,
    completedConsultations: 148,
    pendingFollowUps: 9,
    totalRevenuePaise: 16840000, // ₹1,68,400.00
    newPatientsThisMonth: 38,
  };

  // Appointment Queue State
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-01',
      appointmentNumber: 'DC-202611-8912',
      patientId: 'p-01',
      patientName: 'Rohit Mehta',
      patientPhone: '+91 91234 56789',
      age: 28,
      gender: 'Male',
      serviceName: 'Acne & Acne Scars Consultation',
      serviceSlug: 'acne-and-acne-scars',
      timeIST: '11:00 AM - 11:25 AM IST',
      date: 'Today (Nov 04)',
      status: 'CONFIRMED',
      chiefComplaint: 'Inflammatory pustules and red marks on cheeks for 4 months. Pain and itching during warm weather.',
      duration: '4 months',
      allergies: ['Penicillin'],
      treatmentsTried: 'OTC Salicylic acid 2% and home remedies',
      meetingType: 'GOOGLE_MEET',
      meetingHostUrl: 'https://meet.google.com/derm-dc2026118912?authuser=dr.harihar%40dermacare.in',
      photos: [
        {
          title: 'Right Cheek Close-up',
          url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'apt-02',
      appointmentNumber: 'DC-202611-9034',
      patientId: 'p-02',
      patientName: 'Pooja Nair',
      patientPhone: '+91 98111 22334',
      age: 32,
      gender: 'Female',
      serviceName: 'Hair Fall & Scalp Health Consultation',
      serviceSlug: 'hair-fall-scalp-evaluation',
      timeIST: '11:30 AM - 11:55 AM IST',
      date: 'Today (Nov 04)',
      status: 'CONFIRMED',
      chiefComplaint: 'Diffuse hair thinning along central scalp partition following dengue fever 3 months ago.',
      duration: '3 months',
      allergies: [],
      treatmentsTried: 'Onion juice, biotin gummies',
      meetingType: 'WHATSAPP',
      meetingHostUrl: 'https://wa.me/919811122334',
      photos: [
        {
          title: 'Midline Scalp Partition',
          url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'apt-03',
      appointmentNumber: 'DC-202611-9150',
      patientId: 'p-03',
      patientName: 'Vikram Sethi',
      patientPhone: '+91 98710 44556',
      age: 41,
      gender: 'Male',
      serviceName: 'Pigmentation & Melasma Protocol',
      serviceSlug: 'pigmentation-and-melasma',
      timeIST: '12:00 PM - 12:25 PM IST',
      date: 'Today (Nov 04)',
      status: 'CONFIRMED',
      chiefComplaint: 'Bilateral symmetrical brownish patches over malar prominence. Aggravated by outdoor golf.',
      duration: '1.5 years',
      allergies: ['Sulfa drugs'],
      treatmentsTried: 'Hydroquinone 4% without medical supervision for 6 months',
      meetingType: 'ZOOM',
      meetingHostUrl: 'https://zoom.us/s/84920491823',
      photos: [],
    },
    {
      id: 'apt-04',
      appointmentNumber: 'DC-202610-4102',
      patientId: 'p-01',
      patientName: 'Rohit Mehta',
      patientPhone: '+91 91234 56789',
      age: 28,
      gender: 'Male',
      serviceName: 'General Dermatology Assessment',
      serviceSlug: 'general-dermatology-eczema-rash',
      timeIST: '04:30 PM - 04:50 PM IST',
      date: 'Oct 15, 2026',
      status: 'COMPLETED',
      chiefComplaint: 'Acute facial rash and irritation.',
      duration: '1 week',
      allergies: ['Penicillin'],
      treatmentsTried: '',
      meetingType: 'GOOGLE_MEET',
      meetingHostUrl: '#',
      photos: [],
    },
  ]);

  // Selected patient appointment for clinical workspace
  const [selectedAptId, setSelectedAptId] = useState<string>('apt-01');
  const activeApt = appointments.find((a) => a.id === selectedAptId) || appointments[0];

  // Clinical SOAP Documentation State
  const [subjective, setSubjective] = useState(
    'Patient reports 4-month history of painful, inflamed pustules and papules on bilateral cheeks and jawline. Worse after sweating and dairy intake. No systemic fever.'
  );
  const [objective, setObjective] = useState(
    'Facial examination: Erythematous inflammatory papules (approx. 12-14) and 3 closed comedones on right malar area. Post-inflammatory erythema (PIE) evident. No hypertrophic scars or cystic fluctuance. Fitzpatrick Skin Type IV.'
  );
  const [diagnosis, setDiagnosis] = useState('Acne Vulgaris (Grade II - Papulopustular) with Post-Inflammatory Erythema (PIE)');
  const [clinicalAdvice, setClinicalAdvice] = useState(
    'Avoid manual extraction/popping of pustules. Use non-comedogenic gel moisturizer. Strictly wear broad spectrum SPF 50+ sunscreen every morning.'
  );
  const [followUpDate, setFollowUpDate] = useState('2026-11-20');

  // Prescription Authoring State
  const [prescriptionItems, setPrescriptionItems] = useState([
    {
      medicineName: 'Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel',
      dosageForm: 'GEL',
      dosage: '1 pea-sized amount',
      frequency: 'Once daily at bedtime',
      durationDays: 30,
      instructions: 'Apply thin layer on dry skin 15 minutes after gentle cleanser. Wash hands immediately.',
    },
    {
      medicineName: 'Azelaic Acid 15% Gel',
      dosageForm: 'GEL',
      dosage: '1 fingertip unit',
      frequency: 'Once daily in the morning',
      durationDays: 30,
      instructions: 'Apply onto post-inflammatory red marks before applying moisturizer and sunscreen.',
    },
    {
      medicineName: 'Ceramide + Hyaluronic Barrier Moisturizing Lotion',
      dosageForm: 'LOTION',
      dosage: '2 pumps',
      frequency: 'Twice daily',
      durationDays: 45,
      instructions: 'Restore skin lipid moisture barrier.',
    },
  ]);

  const [prescriptionApproved, setPrescriptionApproved] = useState(false);
  const [digitalSealHash, setDigitalSealHash] = useState('');

  // Availability Settings State
  const [workingDays, setWorkingDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
    Sun: false,
  });
  const [morningShift, setMorningShift] = useState({ start: '10:00', end: '13:00' });
  const [eveningShift, setEveningShift] = useState({ start: '16:30', end: '19:30' });
  const [slotDuration, setSlotDuration] = useState(25);
  const [methodsEnabled, setMethodsEnabled] = useState({
    googleMeet: true,
    zoom: true,
    whatsapp: true,
  });

  // Handle adding prescription item
  const handleAddMedicine = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      {
        medicineName: 'Minoxidil 5% Topical Solution',
        dosageForm: 'SOLUTION',
        dosage: '1 ml',
        frequency: 'Once daily at night',
        durationDays: 60,
        instructions: 'Apply directly to dry scalp along thinning partition using dropper. Massage gently.',
      },
    ]);
  };

  const handleRemoveMedicine = (idx: number) => {
    setPrescriptionItems(prescriptionItems.filter((_, i) => i !== idx));
  };

  // Handle Approving & Publishing Prescription
  const handleApprovePrescription = () => {
    const seal = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setDigitalSealHash(seal);
    setPrescriptionApproved(true);

    // Update appointment status to COMPLETED
    setAppointments((prev) =>
      prev.map((a) => (a.id === activeApt.id ? { ...a, status: 'COMPLETED' } : a))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF8F5]">
      {/* Top Banner */}
      <div className="bg-forest-950 text-ivory-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-forest-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-forest-800 border border-forest-700 flex items-center justify-center text-ivory-100 text-2xl shadow-md">
            <Stethoscope className="w-8 h-8 text-sand-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-ivory-50">{doctor.fullName}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-800 text-sand-300 px-2.5 py-0.5 rounded-full border border-forest-700">
                Doctor Console
              </span>
            </div>
            <p className="text-xs text-sage-300">
              {doctor.qualificationString} • NMC Reg: <strong>{doctor.nmcRegistrationNumber}</strong> ({doctor.stateMedicalCouncil})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-sage-300">
          <div>
            <p className="text-sage-400">Today's Consults</p>
            <p className="text-lg font-extrabold text-sand-300">{stats.todayAppointments} Scheduled</p>
          </div>
          <div>
            <p className="text-sage-400">Practice Status</p>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemedicine Shift
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-1 border-b border-ivory-300 pb-px text-xs font-bold scrollbar-none">
        {[
          { id: 'dashboard', label: 'Practice Overview', icon: Activity },
          { id: 'appointments', label: 'Appointment Calendar', icon: Calendar },
          { id: 'workspace', label: 'Clinical Workspace', icon: FileText },
          { id: 'timeline', label: 'Patient Timeline', icon: History },
          { id: 'patients', label: 'Patient Directory', icon: Users },
          { id: 'availability', label: 'Availability & Fees', icon: Settings },
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
      {/* 1. DOCTOR DASHBOARD OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Practice Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-premium space-y-1">
              <p className="text-xs text-sage-600 font-semibold">Today's Consultations</p>
              <p className="text-3xl font-extrabold text-forest-950">{stats.todayAppointments}</p>
              <p className="text-[11px] text-emerald-700 font-medium">All confirmed & paid</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-premium space-y-1">
              <p className="text-xs text-sage-600 font-semibold">Upcoming Bookings</p>
              <p className="text-3xl font-extrabold text-forest-950">{stats.upcomingAppointments}</p>
              <p className="text-[11px] text-sage-600">Next 7 days</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-premium space-y-1">
              <p className="text-xs text-sage-600 font-semibold">Pending Follow-Ups</p>
              <p className="text-3xl font-extrabold text-sand-600">{stats.pendingFollowUps}</p>
              <p className="text-[11px] text-sage-600">Due for review this week</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-premium space-y-1">
              <p className="text-xs text-sage-600 font-semibold">Consultation Revenue</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-forest-900">
                {formatINR(stats.totalRevenuePaise)}
              </p>
              <p className="text-[11px] text-sage-600">Razorpay verified earnings</p>
            </div>
          </div>

          {/* Today's Live Queue & Quick Start */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-ivory-200">
              <div>
                <h2 className="text-lg font-bold text-forest-950">Today's Consultation Schedule</h2>
                <p className="text-xs text-sage-700">Patient intake forms and uploaded photographs are ready for review.</p>
              </div>

              <span className="text-xs font-bold text-forest-800 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                4 Patients Queued
              </span>
            </div>

            <div className="space-y-3">
              {appointments.filter((a) => a.date.includes('Today')).map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl border border-ivory-300 hover:border-forest-400 bg-ivory-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-forest-950">{apt.timeIST.replace(' IST', '')}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-100 text-forest-900 px-2 py-0.5 rounded">
                        {apt.meetingType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-sage-600">#{apt.appointmentNumber}</span>
                    </div>
                    <h3 className="text-base font-bold text-forest-950">{apt.patientName}</h3>
                    <p className="text-xs text-sage-700">
                      {apt.gender}, {apt.age} yrs • {apt.serviceName}
                    </p>
                    <p className="text-xs text-forest-900/80 italic">"{apt.chiefComplaint}"</p>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAptId(apt.id);
                        setActiveTab('workspace');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-forest-900 bg-white hover:bg-ivory-200 border border-ivory-300 rounded-xl transition-colors"
                    >
                      <Eye className="w-4 h-4 text-forest-700" /> Open Clinical Workspace
                    </button>

                    <a
                      href={apt.meetingHostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all shrink-0"
                    >
                      <Video className="w-4 h-4 text-sand-300" /> Launch Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. APPOINTMENT MANAGEMENT CALENDAR & LIST */}
      {/* ======================================================== */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-forest-950">Appointments Management</h2>
              <p className="text-xs text-sage-700">View, reschedule, or cancel consultations across your calendar.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-sage-700">Filter Status:</span>
              <select className="px-3 py-1.5 text-xs rounded-xl border border-ivory-300 bg-white font-medium">
                <option value="ALL">All Appointments</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-ivory-300 overflow-hidden shadow-premium">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-100 text-forest-950 font-bold border-b border-ivory-300">
                <tr>
                  <th className="p-4">Appointment Ref</th>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date & Slot (IST)</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-ivory-50">
                    <td className="p-4 font-bold text-forest-950">{apt.appointmentNumber}</td>
                    <td className="p-4">
                      <p className="font-bold text-forest-950">{apt.patientName}</p>
                      <p className="text-[11px] text-sage-600">{apt.patientPhone}</p>
                    </td>
                    <td className="p-4 text-forest-900">{apt.serviceName}</td>
                    <td className="p-4">
                      <p className="font-semibold text-forest-950">{apt.date}</p>
                      <p className="text-[11px] text-sage-600">{apt.timeIST}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2 py-0.5 rounded">
                        {apt.meetingType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                          apt.status === 'CONFIRMED'
                            ? 'bg-forest-100 text-forest-800 border-forest-200'
                            : 'bg-ivory-200 text-sage-700 border-ivory-300'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAptId(apt.id);
                            setActiveTab('workspace');
                          }}
                          className="font-bold text-forest-700 hover:underline"
                        >
                          Workspace
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => alert(`Marked ${apt.appointmentNumber} as Completed.`)}
                          className="text-sage-600 hover:text-forest-900"
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PATIENT CLINICAL WORKSPACE (4 SECTIONS + SOAP + RX) */}
      {/* ======================================================== */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          {/* Patient Banner & Launch Meeting */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-premium space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-ivory-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600">
                  Active Consultation #{activeApt.appointmentNumber}
                </span>
                <h2 className="text-2xl font-bold text-forest-950">
                  {activeApt.patientName} ({activeApt.gender}, {activeApt.age} yrs)
                </h2>
                <p className="text-xs text-sage-700">
                  Phone: <strong>{activeApt.patientPhone}</strong> • Service: {activeApt.serviceName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeApt.meetingHostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all shrink-0"
                >
                  <Video className="w-4 h-4 text-sand-300" />
                  Start Consultation ({activeApt.meetingType.replace('_', ' ')})
                </a>
              </div>
            </div>

            {/* Allergies & Red Flags Alert */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-0.5">
                <p className="font-bold flex items-center gap-1.5 text-rose-950">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Known Drug Allergies:
                </p>
                <p className="font-semibold">{activeApt.allergies.join(', ') || 'No known allergies reported'}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-ivory-300 text-forest-950 space-y-0.5">
                <p className="font-bold text-sage-600">Problem Duration:</p>
                <p className="font-semibold">{activeApt.duration}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-ivory-300 text-forest-950 space-y-0.5">
                <p className="font-bold text-sage-600">Prior Treatments Tried:</p>
                <p className="font-semibold truncate">{activeApt.treatmentsTried}</p>
              </div>
            </div>

            {/* Attached Patient Intake Photographs */}
            {activeApt.photos.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs font-bold text-forest-950">
                  Patient Attached Skin Photos ({activeApt.photos.length})
                </p>
                <div className="flex gap-4">
                  {activeApt.photos.map((photo, i) => (
                    <div key={i} className="space-y-1">
                      <div className="w-36 h-28 rounded-xl overflow-hidden bg-ivory-200 border border-ivory-300">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[11px] font-semibold text-sage-700">{photo.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 1: SOAP Clinical Notes */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forest-950 flex items-center gap-2">
              <FileText className="w-4 h-4 text-forest-700" />
              SOAP Clinical Notes & Assessment
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  1. Subjective History (Complaints, Triggers, Duration)
                </label>
                <textarea
                  rows={2}
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                  className="w-full p-3 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  2. Objective Dermatological Examination (Lesion Distribution, Morphology, Erythema)
                </label>
                <textarea
                  rows={2}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full p-3 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-forest-950 mb-1">
                    3. Final Clinical Diagnosis *
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 font-bold text-forest-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-forest-950 mb-1">
                    Recommended Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  4. Patient Lifestyle, Diet & Sun-Protection Advice
                </label>
                <input
                  type="text"
                  value={clinicalAdvice}
                  onChange={(e) => setClinicalAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Prescription Authoring & Approval */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-forest-950 flex items-center gap-2">
                  <span className="text-lg font-extrabold text-forest-900">℞</span>
                  Prescription Editor (NMC Telemedicine Guidelines Compliant)
                </h3>
                <p className="text-xs text-sage-700">Prescribe approved topical formulations, tablets, and barrier agents.</p>
              </div>

              {!prescriptionApproved && (
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-200 rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Medication
                </button>
              )}
            </div>

            {prescriptionApproved ? (
              <div className="p-6 rounded-2xl bg-forest-50 border border-forest-200 space-y-3">
                <div className="flex items-center gap-2 text-forest-900 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-forest-700" />
                  Prescription Approved, Digitally Signed & Published to Patient
                </div>
                <p className="text-xs text-forest-900/80 leading-relaxed">
                  This issued prescription has been cryptographically locked against silent edits. The patient can now view and download their verified PDF.
                </p>
                <p className="text-[10px] font-mono text-sage-600">
                  Digital Audit Seal: {digitalSealHash}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-ivory-300 bg-ivory-50/60 space-y-3 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-forest-950">Medication #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(idx)}
                        className="text-sage-500 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Medicine Name / Formulation
                        </label>
                        <input
                          type="text"
                          value={item.medicineName}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].medicineName = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-ivory-300 font-bold text-forest-950 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Dosage Form
                        </label>
                        <select
                          value={item.dosageForm}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].dosageForm = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-ivory-300 bg-white"
                        >
                          <option value="GEL">GEL</option>
                          <option value="CREAM">CREAM</option>
                          <option value="LOTION">LOTION</option>
                          <option value="TABLET">TABLET</option>
                          <option value="CAPSULE">CAPSULE</option>
                          <option value="SOLUTION">SOLUTION</option>
                          <option value="SUNSCREEN">SUNSCREEN</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Dosage Quantity
                        </label>
                        <input
                          type="text"
                          value={item.dosage}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].dosage = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-ivory-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Frequency
                        </label>
                        <input
                          type="text"
                          value={item.frequency}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].frequency = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-ivory-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Duration (Days)
                        </label>
                        <input
                          type="number"
                          value={item.durationDays}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].durationDays = Number(e.target.value);
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-ivory-300 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-sage-700 mb-1">
                          Specific Clinical Instructions
                        </label>
                        <input
                          type="text"
                          value={item.instructions}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[idx].instructions = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-ivory-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Consultation draft saved.')}
                    className="px-5 py-3 text-xs font-semibold text-sage-700 hover:text-forest-900 bg-ivory-200 rounded-xl"
                  >
                    Save Draft
                  </button>

                  <button
                    type="button"
                    onClick={handleApprovePrescription}
                    className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    <ShieldCheck className="w-4 h-4 text-sand-300" />
                    Approve, Sign & Issue Prescription
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CHRONOLOGICAL PATIENT TREATMENT TIMELINE */}
      {/* ======================================================== */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Patient Treatment Timeline — {activeApt.patientName}</h2>
            <p className="text-xs text-sage-700">Chronological history connecting all consultations, prescriptions, and progress photos.</p>
          </div>

          <div className="relative pl-6 border-l-2 border-forest-300 space-y-8 text-xs">
            {/* Timeline Item 1 */}
            <div className="relative space-y-1.5">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-forest-900 border-2 border-white"></span>
              <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wide">Nov 04, 2026</span>
              <h4 className="font-bold text-forest-950 text-sm">Follow-up Review Consultation Scheduled</h4>
              <p className="text-sage-800 leading-relaxed">
                Patient reports good tolerance to Adapalene gel. Lesions flattening, minimal flaking.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative space-y-1.5">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-sand-500 border-2 border-white"></span>
              <span className="text-[10px] font-bold text-sand-700 uppercase tracking-wide">Nov 02, 2026</span>
              <h4 className="font-bold text-forest-950 text-sm">Patient Uploaded Progress Photographs</h4>
              <p className="text-sage-800 leading-relaxed">
                2 close-up images of right and left cheeks added to skin gallery. Marked improvement in erythema.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative space-y-1.5">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-forest-700 border-2 border-white"></span>
              <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wide">Oct 15, 2026</span>
              <h4 className="font-bold text-forest-950 text-sm">Initial Consultation & Prescription Issued (RX-202610-3819)</h4>
              <p className="text-sage-800 leading-relaxed">
                Diagnosed with Acne Vulgaris (Grade II). Started on topical Adapalene 0.1% + Benzoyl Peroxide and Azelaic acid 15%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. PATIENT DIRECTORY TAB */}
      {/* ======================================================== */}
      {activeTab === 'patients' && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-forest-950">Patient Medical Directory</h2>
              <p className="text-xs text-sage-700">Unified lifetime medical profiles for all patients registered at your practice.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-sage-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name or mobile..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-ivory-300 bg-ivory-50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-ivory-300 rounded-2xl overflow-hidden">
              <thead className="bg-ivory-100 text-forest-950 font-bold border-b border-ivory-300">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Age / Gender</th>
                  <th className="p-4">Known Allergies</th>
                  <th className="p-4">Total Consultations</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                <tr className="hover:bg-ivory-50">
                  <td className="p-4 font-bold text-forest-950">Rohit Mehta</td>
                  <td className="p-4 text-sage-800">+91 91234 56789</td>
                  <td className="p-4 text-sage-800">28 Yrs / Male</td>
                  <td className="p-4 text-rose-700 font-semibold">Penicillin</td>
                  <td className="p-4 font-bold text-forest-900">2 Consultations</td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedAptId('apt-01');
                        setActiveTab('workspace');
                      }}
                      className="text-xs font-bold text-forest-700 hover:underline"
                    >
                      Open Chart
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-ivory-50">
                  <td className="p-4 font-bold text-forest-950">Pooja Nair</td>
                  <td className="p-4 text-sage-800">+91 98111 22334</td>
                  <td className="p-4 text-sage-800">32 Yrs / Female</td>
                  <td className="p-4 text-sage-600">No known allergies</td>
                  <td className="p-4 font-bold text-forest-900">1 Consultation</td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedAptId('apt-02');
                        setActiveTab('workspace');
                      }}
                      className="text-xs font-bold text-forest-700 hover:underline"
                    >
                      Open Chart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. AVAILABILITY & FEES CONFIGURATION */}
      {/* ======================================================== */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6 max-w-3xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Practice Schedule & Consultation Fees</h2>
            <p className="text-xs text-sage-700">Changes immediately reflect in the patient booking calendar.</p>
          </div>

          <form className="space-y-6 text-xs">
            {/* Working Days */}
            <div className="space-y-2">
              <label className="block font-semibold text-forest-950">Active Consultation Days (Mon - Sun)</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(workingDays).map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() =>
                      setWorkingDays({ ...workingDays, [day]: !workingDays[day as keyof typeof workingDays] })
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      workingDays[day as keyof typeof workingDays]
                        ? 'bg-forest-900 text-ivory-50 shadow-sm'
                        : 'bg-ivory-100 text-sage-500 border border-ivory-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Shift Timings in IST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 space-y-2">
                <span className="font-bold text-forest-950">Morning Shift (IST)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={morningShift.start}
                    onChange={(e) => setMorningShift({ ...morningShift, start: e.target.value })}
                    className="p-2 rounded-lg border border-ivory-300 bg-white"
                  />
                  <input
                    type="time"
                    value={morningShift.end}
                    onChange={(e) => setMorningShift({ ...morningShift, end: e.target.value })}
                    className="p-2 rounded-lg border border-ivory-300 bg-white"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 space-y-2">
                <span className="font-bold text-forest-950">Evening Shift (IST)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={eveningShift.start}
                    onChange={(e) => setEveningShift({ ...eveningShift, start: e.target.value })}
                    className="p-2 rounded-lg border border-ivory-300 bg-white"
                  />
                  <input
                    type="time"
                    value={eveningShift.end}
                    onChange={(e) => setEveningShift({ ...eveningShift, end: e.target.value })}
                    className="p-2 rounded-lg border border-ivory-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Consultation Duration */}
            <div className="space-y-2">
              <label className="block font-semibold text-forest-950">Default Slot Duration (Minutes)</label>
              <div className="flex gap-3">
                {[15, 20, 25, 30].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSlotDuration(dur)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      slotDuration === dur
                        ? 'bg-forest-900 text-ivory-50'
                        : 'bg-ivory-100 text-sage-700 border border-ivory-300'
                    }`}
                  >
                    {dur} Minutes
                  </button>
                ))}
              </div>
            </div>

            {/* Enabled Video Methods */}
            <div className="space-y-2">
              <label className="block font-semibold text-forest-950">Enabled Consultation Methods</label>
              <div className="grid grid-cols-3 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-ivory-100 border border-ivory-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={methodsEnabled.googleMeet}
                    onChange={(e) => setMethodsEnabled({ ...methodsEnabled, googleMeet: e.target.checked })}
                    className="rounded text-forest-700"
                  />
                  <span>Google Meet</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl bg-ivory-100 border border-ivory-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={methodsEnabled.zoom}
                    onChange={(e) => setMethodsEnabled({ ...methodsEnabled, zoom: e.target.checked })}
                    className="rounded text-forest-700"
                  />
                  <span>Zoom Video</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl bg-ivory-100 border border-ivory-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={methodsEnabled.whatsapp}
                    onChange={(e) => setMethodsEnabled({ ...methodsEnabled, whatsapp: e.target.checked })}
                    className="rounded text-forest-700"
                  />
                  <span>WhatsApp Call</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => alert('Practice availability settings updated successfully!')}
                className="px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 rounded-xl"
              >
                Save Availability Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
