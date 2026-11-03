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
} from 'lucide-react';
import { fallbackDoctor } from '@/lib/api';

export default function DoctorPortalPage() {
  const doctor = fallbackDoctor;

  // Selected appointment
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('apt-today-01');

  // Appointments queue
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-today-01',
      appointmentNumber: 'DC-202611-8912',
      patientName: 'Rohit Mehta',
      patientPhone: '+91 91234 56789',
      age: 28,
      gender: 'Male',
      serviceName: 'Acne & Acne Scars Consultation',
      timeIST: '11:00 AM - 11:25 AM IST',
      status: 'CONFIRMED',
      chiefComplaint: 'Inflammatory cystic acne on cheeks and jawline for past 4 months. Tried OTC salicylic acid wash with little improvement.',
      meetingHostUrl: 'https://meet.google.com/derm-dc2026118912?authuser=dr.harihar%40dermacare.in',
      meetingType: 'GOOGLE_MEET',
      allergies: ['Penicillin'],
    },
    {
      id: 'apt-today-02',
      appointmentNumber: 'DC-202611-9034',
      patientName: 'Pooja Nair',
      patientPhone: '+91 98111 22334',
      age: 32,
      gender: 'Female',
      serviceName: 'Hair Fall & Scalp Health Consultation',
      timeIST: '11:30 AM - 11:55 AM IST',
      status: 'CONFIRMED',
      chiefComplaint: 'Excessive hair shedding after recovery from dengue fever 3 months ago. Noticeable thinning along midline parting.',
      meetingHostUrl: 'https://wa.me/919811122334',
      meetingType: 'WHATSAPP',
      allergies: [],
    },
  ]);

  const activeApt = appointments.find((a) => a.id === selectedAppointmentId) || appointments[0];

  // Clinical SOAP Notes State
  const [subjective, setSubjective] = useState(activeApt?.chiefComplaint || '');
  const [objective, setObjective] = useState('Erythematous papules and 3-4 closed comedones bilateral cheeks. No nodular scarring yet. Skin type: Combination-Oily.');
  const [finalDiagnosis, setFinalDiagnosis] = useState('Acne Vulgaris (Grade II - Papulopustular)');
  const [clinicalAdvice, setClinicalAdvice] = useState('Avoid popping lesions. Strictly wear broad spectrum SPF 50 sunscreen daily.');
  const [followUpDays, setFollowUpDays] = useState(30);

  // Prescription Items State
  const [prescriptionItems, setPrescriptionItems] = useState([
    {
      medicineName: 'Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel',
      dosageForm: 'GEL',
      dosage: 'Pea-sized amount',
      frequency: 'Once daily at bedtime',
      durationDays: 30,
      instructions: 'Apply thin layer on dry skin 15 minutes after washing. Wash hands immediately.',
    },
    {
      medicineName: 'Azelaic Acid 15% Gel',
      dosageForm: 'GEL',
      dosage: '1 fingertip unit',
      frequency: 'Once daily in the morning',
      durationDays: 30,
      instructions: 'Apply onto post-inflammatory red spots. Follow with moisturizer.',
    },
  ]);

  const [prescriptionSealed, setPrescriptionSealed] = useState(false);
  const [sealedHash, setSealedHash] = useState('');

  const handleAddMedicine = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      {
        medicineName: 'Ceramide Barrier Relief Lotion',
        dosageForm: 'LOTION',
        dosage: 'Generous pump',
        frequency: 'Twice daily',
        durationDays: 30,
        instructions: 'Apply to damp face to restore lipid skin barrier.',
      },
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setPrescriptionItems(prescriptionItems.filter((_, i) => i !== index));
  };

  const handleApproveAndSealPrescription = () => {
    // Generate simulated SHA-256 seal
    const hash = 'a9f4c32b9188e02d689ef23910cb4519f7' + Math.random().toString(16).substring(2, 10);
    setSealedHash(hash);
    setPrescriptionSealed(true);

    // Update appointment status to COMPLETED
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === activeApt.id ? { ...a, status: 'COMPLETED' } : a
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-xl">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{doctor.fullName}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded border border-brand-400/30">
                Doctor Console
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {doctor.qualificationString} • NMC Reg: {doctor.nmcRegistrationNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300">
          <div>
            <p className="text-slate-400">Today's Consultations</p>
            <p className="text-lg font-extrabold text-brand-400">{appointments.length} Scheduled</p>
          </div>
          <div>
            <p className="text-slate-400">Practice Status</p>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemedicine Shift
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Today's Patient Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>Today's Appointments Queue</span>
            <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
              IST Timeline
            </span>
          </h2>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <button
                key={apt.id}
                type="button"
                onClick={() => {
                  setSelectedAppointmentId(apt.id);
                  setPrescriptionSealed(apt.status === 'COMPLETED');
                  setSubjective(apt.chiefComplaint);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedAppointmentId === apt.id
                    ? 'bg-white border-brand-500 shadow-md ring-2 ring-brand-500/10'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-900">{apt.timeIST.replace(' IST', '')}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      apt.status === 'COMPLETED'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{apt.patientName}</h3>
                <p className="text-xs text-slate-500">{apt.gender}, {apt.age} yrs • {apt.serviceName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Consultation & Prescription Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Patient Card & Start Meeting Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active Consultation #{activeApt.appointmentNumber}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {activeApt.patientName} ({activeApt.gender}, {activeApt.age} yrs)
                </h2>
                <p className="text-xs text-slate-500">
                  Phone: {activeApt.patientPhone} • Allergies: {activeApt.allergies.join(', ') || 'No known allergies'}
                </p>
              </div>

              <a
                href={activeApt.meetingHostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all shrink-0"
              >
                <Video className="w-4 h-4" />
                Launch Meeting ({activeApt.meetingType.replace('_', ' ')})
              </a>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs text-amber-900">
              <strong>Patient Chief Complaint:</strong> {activeApt.chiefComplaint}
            </div>
          </div>

          {/* Clinical SOAP Documentation */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              Clinical SOAP Documentation
            </h3>

            <div className="grid grid-cols-1 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  1. Subjective Complaints & History of Present Illness
                </label>
                <textarea
                  rows={2}
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  2. Objective Dermatological Findings (Distribution, Morphology, Erythema)
                </label>
                <textarea
                  rows={2}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    3. Final Clinical Diagnosis
                  </label>
                  <input
                    type="text"
                    value={finalDiagnosis}
                    onChange={(e) => setFinalDiagnosis(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Follow-Up Recommended (Days)
                  </label>
                  <input
                    type="number"
                    value={followUpDays}
                    onChange={(e) => setFollowUpDays(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  4. Patient Lifestyle & Photoprotection Advice
                </label>
                <input
                  type="text"
                  value={clinicalAdvice}
                  onChange={(e) => setClinicalAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Interactive Prescription Editor */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Prescription Authoring (NMC Telemedicine Format)
                </h3>
              </div>

              {!prescriptionSealed && (
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Medication
                </button>
              )}
            </div>

            {prescriptionSealed ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Prescription Approved & Cryptographically Sealed
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  This prescription is now immutable and stored for patient download under NMC Telemedicine Guidelines.
                </p>
                <p className="text-[11px] font-mono text-emerald-700">
                  Digital Audit Hash: {sealedHash}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptionItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-700">Item #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Medicine / Generic Name
                        </label>
                        <input
                          type="text"
                          value={item.medicineName}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].medicineName = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300 font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Dosage Form
                        </label>
                        <select
                          value={item.dosageForm}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].dosageForm = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300 bg-white"
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
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Dosage Quantity
                        </label>
                        <input
                          type="text"
                          value={item.dosage}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].dosage = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Frequency
                        </label>
                        <input
                          type="text"
                          value={item.frequency}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].frequency = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Duration (Days)
                        </label>
                        <input
                          type="number"
                          value={item.durationDays}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].durationDays = Number(e.target.value);
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Clinical Instructions for Patient
                        </label>
                        <input
                          type="text"
                          value={item.instructions}
                          onChange={(e) => {
                            const updated = [...prescriptionItems];
                            updated[index].instructions = e.target.value;
                            setPrescriptionItems(updated);
                          }}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleApproveAndSealPrescription}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Approve, Seal & Issue Digital Prescription
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
