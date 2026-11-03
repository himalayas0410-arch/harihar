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
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'photos'>('appointments');

  // Sample patient data
  const patient = {
    fullName: 'Rohit Mehta',
    phoneNumber: '+91 91234 56789',
    email: 'rohit.mehta@example.com',
    gender: 'Male',
    age: 28,
  };

  const appointments = [
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
    },
  ];

  const prescriptions = [
    {
      id: 'rx-01',
      prescriptionNumber: 'RX-202611-4821',
      date: 'Oct 15, 2026',
      doctorName: 'Dr. Harihar Sharma',
      nmcReg: 'NMC/MCI/2015/78412',
      diagnosis: 'Acne Vulgaris (Grade II - Papulopustular) with Post-Inflammatory Erythema',
      items: [
        {
          name: 'Adapalene + Benzoyl Peroxide Gel (0.1% / 2.5%)',
          form: 'GEL',
          dosage: '1 pea-sized amount',
          frequency: 'Once daily at bedtime',
          duration: '30 Days',
          instructions: 'Apply thin layer strictly on affected areas after gentle cleanser. Use sunscreen daily.',
        },
        {
          name: 'Azelaic Acid 15% Gel',
          form: 'GEL',
          dosage: '1 fingertip unit',
          frequency: 'Once daily in morning',
          duration: '30 Days',
          instructions: 'Apply on red post-acne marks before applying moisturizer and sunscreen.',
        },
        {
          name: 'Ceramide + Hyaluronic Acid Barrier Moisturizer',
          form: 'LOTION',
          dosage: 'Generous layer',
          frequency: 'Twice daily',
          duration: 'Ongoing',
          instructions: 'Maintain skin moisture barrier to prevent dryness from retinoid.',
        },
      ],
      signatureHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
  ];

  const [uploadedPhotos, setUploadedPhotos] = useState([
    {
      id: 'p1',
      title: 'Right Cheek Baseline Acne Photo',
      date: 'Nov 3, 2026',
      type: 'SKIN_PHOTO',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'p2',
      title: 'Previous CBC & Lipid Profile',
      date: 'Oct 12, 2026',
      type: 'LAB_REPORT',
      url: '#',
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Patient Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-xl">
            {patient.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{patient.fullName}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                Verified Patient
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {patient.phoneNumber} • {patient.email}
            </p>
          </div>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Book New Consultation
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 px-4 flex items-center gap-2 transition-colors ${
            activeTab === 'appointments'
              ? 'border-b-2 border-brand-600 text-brand-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          My Consultations ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-3 px-4 flex items-center gap-2 transition-colors ${
            activeTab === 'prescriptions'
              ? 'border-b-2 border-brand-600 text-brand-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Prescription History ({prescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`pb-3 px-4 flex items-center gap-2 transition-colors ${
            activeTab === 'photos'
              ? 'border-b-2 border-brand-600 text-brand-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Skin Photos & Records ({uploadedPhotos.length})
        </button>
      </div>

      {/* TAB 1: CONSULTATIONS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">{apt.appointmentNumber}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    {apt.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{apt.serviceName}</h3>
                <p className="text-xs text-slate-500">
                  Doctor: <strong className="text-slate-700">{apt.doctorName}</strong>
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {apt.timeIST}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <a
                  href={apt.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all"
                >
                  <Video className="w-4 h-4" /> Join Video Call
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded">
                      {rx.prescriptionNumber}
                    </span>
                    <span className="text-xs text-slate-500">Issued on {rx.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{rx.doctorName}</h3>
                  <p className="text-xs text-slate-500">NMC Reg: {rx.nmcReg}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download / Print PDF Rx
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-400">Diagnosis</p>
                <p className="text-sm font-bold text-slate-900">{rx.diagnosis}</p>
              </div>

              {/* Medicine Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Prescribed Formulations & Regimen
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3">Medication</th>
                        <th className="p-3">Dosage / Form</th>
                        <th className="p-3">Frequency</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Clinical Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {rx.items.map((item, i) => (
                        <tr key={i}>
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">{item.dosage} ({item.form})</td>
                          <td className="p-3 text-slate-600">{item.frequency}</td>
                          <td className="p-3 text-slate-600">{item.duration}</td>
                          <td className="p-3 text-slate-600 font-medium">{item.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Sealed & Digitally Verified Prescription
                </span>
                <span className="font-mono text-[10px] truncate max-w-sm">
                  SHA-256: {rx.signatureHash}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PHOTOS & RECORDS */}
      {activeTab === 'photos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload New Skin Photo or Lab Report</h3>
              <p className="text-xs text-slate-500">
                Stored in private encrypted S3 cloud storage. Only accessible to Dr. Harihar Sharma.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 rounded-xl cursor-pointer transition-colors">
              <Upload className="w-4 h-4" /> Select File to Upload
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {photo.type === 'SKIN_PHOTO' ? (
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-12 h-12 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{photo.title}</h4>
                  <p className="text-[11px] text-slate-500">{photo.date} • {photo.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
