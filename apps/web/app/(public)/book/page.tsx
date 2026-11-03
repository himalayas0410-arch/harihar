'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  User,
  ArrowRight,
  ArrowLeft,
  Phone,
  Sparkles,
  Lock,
} from 'lucide-react';
import { fallbackServices, fallbackDoctor } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function BookingPage() {
  const services = fallbackServices;
  const doctor = fallbackDoctor;

  // Multi-step form state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const [selectedProvider, setSelectedProvider] = useState<'GOOGLE_MEET' | 'ZOOM' | 'WHATSAPP'>('GOOGLE_MEET');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM - 11:25 AM IST');

  // Patient Intake
  const [patientName, setPatientName] = useState('Rohit Mehta');
  const [patientPhone, setPatientPhone] = useState('+91 91234 56789');
  const [patientEmail, setPatientEmail] = useState('rohit.mehta@example.com');
  const [patientGender, setPatientGender] = useState('MALE');
  const [patientAge, setPatientAge] = useState('28');
  const [chiefComplaint, setChiefComplaint] = useState('Persistent inflammatory acne on cheeks and jawline for past 4 months.');
  const [consentAgreed, setConsentAgreed] = useState(true);

  // Booking result
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  const availableSlots = [
    '10:00 AM - 10:25 AM IST',
    '10:30 AM - 10:55 AM IST',
    '11:00 AM - 11:25 AM IST',
    '11:30 AM - 11:55 AM IST',
    '12:00 PM - 12:25 PM IST',
    '04:30 PM - 04:55 PM IST',
    '05:00 PM - 05:25 PM IST',
    '05:30 PM - 05:55 PM IST',
    '06:00 PM - 06:25 PM IST',
  ];

  const handleCompletePaymentAndBook = async () => {
    setIsProcessing(true);
    // Simulate server-side slot lock + Razorpay order creation + payment verification
    setTimeout(() => {
      const aptNumber = `DC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      let meetingLink = `https://meet.google.com/derm-${aptNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (selectedProvider === 'ZOOM') {
        meetingLink = `https://zoom.us/j/82941098234?pwd=derma`;
      } else if (selectedProvider === 'WHATSAPP') {
        meetingLink = `https://wa.me/919876543210?text=Hello%20Dr.%20Harihar,%20I%20am%20ready%20for%20my%20consultation%20${aptNumber}`;
      }

      setConfirmedData({
        appointmentNumber: aptNumber,
        serviceName: selectedService.name,
        priceInPaise: selectedService.priceInPaise,
        date: selectedDate,
        slot: selectedSlot,
        provider: selectedProvider,
        meetingLink,
        patientName,
        patientPhone,
        doctorName: doctor.fullName,
      });

      setIsProcessing(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  if (bookingConfirmed && confirmedData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 shadow-xl space-y-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment Confirmed & Verified
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Your Dermatology Appointment is Booked!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Appointment Reference: <strong className="text-slate-800">{confirmedData.appointmentNumber}</strong>
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Consulting Dermatologist</p>
                <p className="font-bold text-slate-900 text-sm">{confirmedData.doctorName}</p>
                <p className="text-slate-500">Reg: {doctor.nmcRegistrationNumber}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Treatment Service</p>
                <p className="font-bold text-slate-900 text-sm">{confirmedData.serviceName}</p>
                <p className="text-emerald-700 font-bold">{formatINR(confirmedData.priceInPaise)} Paid</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Date & Time (IST)</p>
                <p className="font-bold text-slate-900">{confirmedData.date}</p>
                <p className="text-slate-600 font-medium">{confirmedData.slot}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Video Platform</p>
                <p className="font-bold text-brand-700 uppercase">{confirmedData.provider.replace('_', ' ')}</p>
                <p className="text-slate-500">Private 1-on-1 Room</p>
              </div>
            </div>

            {/* Direct Join Link */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">Your Video Meeting Link:</span>
                <p className="text-slate-500 text-[11px] truncate max-w-xs">{confirmedData.meetingLink}</p>
              </div>
              <a
                href={confirmedData.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all shrink-0"
              >
                <Video className="w-4 h-4" />
                Join Consultation Room
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/portal"
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Go to Patient Portal & Upload Photos
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Book Online Consultation</h1>
          <p className="text-xs text-slate-500">Dr. Harihar Sharma • MD Dermatology (AIIMS)</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className={step >= 1 ? 'text-brand-600 font-extrabold' : ''}>1. Service</span>
          <span>•</span>
          <span className={step >= 2 ? 'text-brand-600 font-extrabold' : ''}>2. Slot</span>
          <span>•</span>
          <span className={step >= 3 ? 'text-brand-600 font-extrabold' : ''}>3. Patient</span>
          <span>•</span>
          <span className={step >= 4 ? 'text-brand-600 font-extrabold' : ''}>4. Payment</span>
        </div>
      </div>

      {/* STEP 1: SELECT SERVICE & VIDEO PROVIDER */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Step 1: Choose Dermatology Service</h2>
            <p className="text-xs text-slate-500">Select the clinical category that best fits your concern.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedServiceId(srv.id)}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  selectedServiceId === srv.id
                    ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-700 bg-brand-100/60 px-2 py-0.5 rounded">
                      {srv.durationMinutes} mins
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      {formatINR(srv.priceInPaise)}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{srv.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{srv.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Video Provider Selection */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Select Preferred Consultation Platform</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'GOOGLE_MEET', label: 'Google Meet', desc: 'No app needed, browser call' },
                { id: 'ZOOM', label: 'Zoom Video', desc: 'Direct Zoom meeting room' },
                { id: 'WHATSAPP', label: 'WhatsApp Call', desc: 'Direct mobile video call' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProvider(p.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedProvider === p.id
                      ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{p.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
            >
              Continue to Choose Slot <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATE & TIME SLOT */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Select Date & Available Time (IST)</h2>
            <p className="text-xs text-slate-500">All slots are in Indian Standard Time (Asia/Kolkata).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Consultation Date</label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[11px] text-slate-400">Regular clinic hours: Mon–Sat</p>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Available Slots on {selectedDate}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center ${
                      selectedSlot === slot
                        ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {slot.replace(' IST', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
            >
              Continue to Patient Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PATIENT INTAKE & CHIEF COMPLAINT */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Patient Information & Complaint</h2>
            <p className="text-xs text-slate-500">Provide medical details for Dr. Harihar Sharma to review before the call.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (WhatsApp Enabled)</label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Describe your skin/hair complaints (Symptoms, duration, prior medicines)
              </label>
              <textarea
                rows={3}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>

            {/* Telemedicine Consent Checkbox */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-3">
              <input
                type="checkbox"
                id="consentCheck"
                checked={consentAgreed}
                onChange={(e) => setConsentAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="consentCheck" className="text-xs text-slate-600 leading-relaxed">
                I hereby provide explicit informed consent for a digital telemedicine consultation in compliance with the NMC Telemedicine Practice Guidelines (2020) and consent to the storage of my health data under the DPDP Act 2023.
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              disabled={!consentAgreed || !patientName || !patientPhone}
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-xl shadow-md transition-all"
            >
              Proceed to Razorpay Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PAYMENT SUMMARY & RAZORPAY CHECKOUT */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Step 4: Review Summary & Secure Payment</h2>
            <p className="text-xs text-slate-500">100% verified Razorpay gateway checkout.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="space-y-3 pb-4 border-b border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Consultation Service:</span>
                <span className="font-bold text-slate-900">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dermatologist:</span>
                <span className="font-bold text-slate-900">{doctor.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-slate-900">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Platform:</span>
                <span className="font-bold text-brand-700">{selectedProvider.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientName} ({patientPhone})</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-xs text-slate-500">Total Payable Amount (INR)</p>
                <p className="text-2xl font-extrabold text-brand-700">
                  {formatINR(selectedService.priceInPaise)}
                </p>
                <p className="text-[10px] text-slate-400">Includes 18% GST • Instant Tax Receipt</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>Supports UPI (GPay, PhonePe), Cards & Net Banking</span>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompletePaymentAndBook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-xl shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
              >
                {isProcessing ? 'Verifying Payment...' : `Pay ${formatINR(selectedService.priceInPaise)} & Confirm`}
              </button>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Patient Intake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
