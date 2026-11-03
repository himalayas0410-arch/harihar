'use client';

import React, { useState, useEffect } from 'react';
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
  Lock,
  Upload,
  AlertCircle,
  FileText,
  Smartphone,
  Download,
  Check,
  Timer,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { fallbackServices, fallbackDoctor } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function BookingPage() {
  const services = fallbackServices;
  const doctor = fallbackDoctor;

  // Multi-step navigation:
  // 1: Auth & Verification, 2: Service Selection, 3: Consultation Method, 4: Date & Time, 5: Medical Intake & Photos, 6: Summary & Payment
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Patient Auth & Profile
  const [patientName, setPatientName] = useState('Rohit Mehta');
  const [patientPhone, setPatientPhone] = useState('+91 91234 56789');
  const [patientEmail, setPatientEmail] = useState('rohit.mehta@example.com');
  const [patientDob, setPatientDob] = useState('1996-08-15');
  const [patientGender, setPatientGender] = useState('MALE');
  const [otpCode, setOtpCode] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(true);

  // 2. Service Selection
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  // 3. Consultation Method
  const [selectedMethod, setSelectedMethod] = useState<'GOOGLE_MEET' | 'ZOOM' | 'WHATSAPP'>('GOOGLE_MEET');

  // 4. Date & Time Slots
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM - 11:25 AM IST');

  // 15-minute slot reservation countdown timer
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins = 900 seconds
  const [slotReserved, setSlotReserved] = useState<boolean>(false);

  useEffect(() => {
    if (!slotReserved) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [slotReserved]);

  // 5. Medical Intake Questionnaire
  const [problemDescription, setProblemDescription] = useState('Persistent inflammatory red papules and painful cystic breakouts on both cheeks and jawline.');
  const [problemDuration, setProblemDuration] = useState('4 months');
  const [symptomItching, setSymptomItching] = useState(true);
  const [symptomPain, setSymptomPain] = useState(true);
  const [symptomInflammation, setSymptomInflammation] = useState(true);
  const [previousConsultation, setPreviousConsultation] = useState('No, this is my first formal dermatology consultation.');
  const [treatmentsTried, setTreatmentsTried] = useState('Used OTC 2% Salicylic acid face wash and tea tree oil for 2 months.');
  const [currentMedicines, setCurrentMedicines] = useState('None currently.');
  const [allergies, setAllergies] = useState('Penicillin (causes mild hives)');
  const [medicalHistory, setMedicalHistory] = useState('No chronic systemic illnesses, non-diabetic.');
  const [bodyAreaTag, setBodyAreaTag] = useState('Bilateral Cheeks');
  const [consentAgreed, setConsentAgreed] = useState(true);

  // Uploaded files simulation
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string; size: string }>>([
    { name: 'right_cheek_close_up.jpg', type: 'Skin Photo (Cheek)', size: '2.4 MB' },
    { name: 'prior_chemist_cream.jpg', type: 'Prior Medication', size: '1.8 MB' },
  ]);

  // 6. Payment & Confirmation
  const [isPaying, setIsPaying] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Time format helper for countdown
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOtp = () => {
    if (otpCode === '123456' || otpCode.length === 6) {
      setIsOtpVerified(true);
      setCurrentStep(2);
    }
  };

  const handleSelectSlotAndLock = (slot: string) => {
    setSelectedSlot(slot);
    setSlotReserved(true);
    setTimeLeft(900); // 15 mins
  };

  const handleProcessRazorpayPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      const aptNumber = `DC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const receiptNumber = `RCP-${aptNumber}`;

      let meetingLink = `https://meet.google.com/derm-${aptNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (selectedMethod === 'ZOOM') {
        meetingLink = `https://zoom.us/j/84920491823?pwd=derma`;
      } else if (selectedMethod === 'WHATSAPP') {
        meetingLink = `https://wa.me/919876543210?text=Hello%20Dr.%20Harihar,%20I%20am%20ready%20for%20my%20DermaCare%20consultation%20${aptNumber}`;
      }

      setConfirmedBooking({
        appointmentId: aptNumber,
        receiptNumber,
        serviceName: selectedService.name,
        priceInPaise: selectedService.priceInPaise,
        date: selectedDate,
        timeSlot: selectedSlot,
        method: selectedMethod,
        meetingLink,
        doctorName: doctor.fullName,
        doctorReg: doctor.nmcRegistrationNumber,
        patientName,
        patientPhone,
        patientEmail,
        confirmedAt: new Date().toLocaleDateString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata',
        }),
      });

      setIsPaying(false);
      setBookingConfirmed(true);
    }, 1500);
  };

  // SUCCESS CONFIRMATION VIEW
  if (bookingConfirmed && confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-forest-300 p-8 sm:p-12 shadow-premium space-y-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-3.5 py-1 rounded-full border border-forest-200">
              Payment Verified & Appointment Confirmed
            </span>
            <h1 className="text-3xl font-extrabold text-forest-950">
              Your Dermatology Consultation is Booked
            </h1>
            <p className="text-xs sm:text-sm text-sage-700">
              Booking Reference: <strong className="text-forest-950">{confirmedBooking.appointmentId}</strong> • Receipt: {confirmedBooking.receiptNumber}
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-ivory-100 rounded-3xl p-6 sm:p-8 border border-ivory-300 text-left space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <p className="text-sage-700 font-medium">Consulting Dermatologist</p>
                <p className="font-bold text-forest-950 text-sm">{confirmedBooking.doctorName}</p>
                <p className="text-sage-600">NMC Reg: {confirmedBooking.doctorReg}</p>
              </div>

              <div>
                <p className="text-sage-700 font-medium">Treatment Service</p>
                <p className="font-bold text-forest-950 text-sm">{confirmedBooking.serviceName}</p>
                <p className="text-forest-700 font-bold">{formatINR(confirmedBooking.priceInPaise)} Paid via Razorpay</p>
              </div>

              <div>
                <p className="text-sage-700 font-medium">Date & Time (IST)</p>
                <p className="font-bold text-forest-950 text-sm">{confirmedBooking.date}</p>
                <p className="text-forest-900 font-semibold">{confirmedBooking.timeSlot}</p>
              </div>

              <div>
                <p className="text-sage-700 font-medium">Consultation Method</p>
                <p className="font-bold text-forest-900 uppercase">{confirmedBooking.method.replace('_', ' ')}</p>
                <p className="text-sage-600">Private 1-on-1 Encrypted Room</p>
              </div>
            </div>

            {/* Direct Video Room Link */}
            <div className="pt-5 border-t border-ivory-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-forest-950">
                <span className="font-bold">Your Meeting Join Link:</span>
                <p className="text-sage-700 text-[11px] truncate max-w-xs">{confirmedBooking.meetingLink}</p>
              </div>
              <a
                href={confirmedBooking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all shrink-0"
              >
                <Video className="w-4 h-4 text-sand-300" />
                Join Video Consultation Room
              </a>
            </div>
          </div>

          {/* Consultation Preparation Instructions */}
          <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 text-left text-xs space-y-2 text-sand-800">
            <h4 className="font-bold flex items-center gap-2 text-sand-900">
              <Sparkles className="w-4 h-4 text-sand-600" /> Instructions Before Your Consultation:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sand-900/80 leading-relaxed">
              <li>Please be in a quiet, well-lit room with natural daylight or soft front-facing light.</li>
              <li>Keep previous creams, face washes, or blood test reports handy for Dr. Harihar to review.</li>
              <li>Wash off heavy makeup or tinted sunscreens 30 minutes before the call to allow accurate skin assessment.</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/portal"
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-forest-900 bg-ivory-200 hover:bg-ivory-300 rounded-xl transition-colors"
            >
              Go to Patient Dashboard & Upload More Photos
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-forest-900 border border-forest-300 hover:bg-ivory-200 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" /> Download Official Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Progress & Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ivory-300 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-forest-950">Book Online Dermatology Consultation</h1>
            <p className="text-xs text-sage-700">Dr. Harihar Sharma • MBBS (AIIMS), MD Dermatology</p>
          </div>

          {/* Slot Reservation Countdown Badge */}
          {slotReserved && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100 border border-sand-300 text-sand-800 text-xs font-bold">
              <Timer className="w-4 h-4 text-sand-600 animate-spin" />
              <span>Slot Held: {formatCountdown(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-6 gap-2 text-[11px] font-bold text-center">
          {[
            { num: 1, label: 'Profile' },
            { num: 2, label: 'Service' },
            { num: 3, label: 'Method' },
            { num: 4, label: 'Slot' },
            { num: 5, label: 'Intake' },
            { num: 6, label: 'Payment' },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2 rounded-xl border transition-all ${
                currentStep === s.num
                  ? 'bg-forest-900 text-ivory-50 border-forest-900 shadow-sm'
                  : currentStep > s.num
                  ? 'bg-forest-100 text-forest-900 border-forest-200'
                  : 'bg-white text-sage-600 border-ivory-300'
              }`}
            >
              {s.num}. {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: PATIENT REGISTRATION & OTP VERIFICATION */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 1: Patient Profile & Mobile Verification</h2>
            <p className="text-xs text-sage-700">
              Every consultation, medical record, and prescription is permanently tied to this verified patient account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Mobile Number (WhatsApp) *</label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Email Address (For PDF Prescription)</label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={patientDob}
                  onChange={(e) => setPatientDob(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* OTP Verification Box */}
          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-xs text-forest-900">
              <p className="font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-forest-700" />
                Mobile OTP Verification
              </p>
              <p className="text-sage-700 text-[11px]">
                {isOtpVerified ? 'Mobile number +91 91234 56789 is verified.' : 'Enter 6-digit OTP sent to your WhatsApp.'}
              </p>
            </div>

            {!isOtpVerified ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-28 px-3 py-2 text-xs rounded-xl border border-forest-300 text-center font-bold"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl"
                >
                  Verify
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-forest-800 bg-white px-3 py-1 rounded-lg border border-forest-200">
                <Check className="w-3.5 h-3.5 text-forest-600" /> Verified
              </span>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!patientName || !patientPhone}
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 disabled:opacity-50 rounded-xl shadow-md transition-all"
            >
              Select Dermatology Service <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: CONSULTATION SERVICE SELECTION */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 2: Choose Consultation Type</h2>
            <p className="text-xs text-sage-700">
              Each clinical service is tailored with adequate duration and condition-specific assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedServiceId(srv.id)}
                className={`text-left p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  selectedServiceId === srv.id
                    ? 'border-forest-700 bg-forest-50/70 ring-2 ring-forest-600/20 shadow-sm'
                    : 'border-ivory-300 bg-white hover:border-ivory-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                      {srv.durationMinutes} mins
                    </span>
                    <span className="text-base font-extrabold text-forest-950">
                      {formatINR(srv.priceInPaise)}
                    </span>
                  </div>
                  <h3 className="font-bold text-forest-950 text-sm">{srv.name}</h3>
                  <p className="text-xs text-sage-700 line-clamp-2">{srv.description}</p>
                </div>

                <div className="pt-2 border-t border-forest-100 flex items-center gap-1.5 text-[11px] text-forest-800 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-forest-600" /> Includes Official Digital Prescription
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-ivory-300">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Profile
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
            >
              Select Consultation Method <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: CONSULTATION METHOD SELECTION */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 3: Select Video Consultation Platform</h2>
            <p className="text-xs text-sage-700">
              Choose how you wish to connect with Dr. Harihar Sharma. All options are fully secure and 1-on-1.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'GOOGLE_MEET',
                title: 'Google Meet',
                tag: 'Recommended for Laptop / PC',
                desc: 'Opens directly in any modern browser (Chrome, Safari, Edge). Zero app downloads required.',
                icon: Video,
              },
              {
                id: 'ZOOM',
                title: 'Zoom Video',
                tag: 'Dedicated Meeting Room',
                desc: 'High-definition video with waiting room security. Requires Zoom desktop or mobile client.',
                icon: Video,
              },
              {
                id: 'WHATSAPP',
                title: 'WhatsApp Call',
                tag: 'Best for Mobile Devices',
                desc: 'Direct doctor-initiated video call on your registered WhatsApp mobile number. Extremely convenient.',
                icon: Phone,
              },
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id as any)}
                  className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    selectedMethod === method.id
                      ? 'border-forest-700 bg-forest-50/70 ring-2 ring-forest-600/20 shadow-sm'
                      : 'border-ivory-300 bg-white hover:border-ivory-400'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-forest-950 text-sm">{method.title}</h3>
                    <span className="inline-block text-[10px] font-semibold text-forest-800 bg-forest-100/70 px-2 py-0.5 rounded">
                      {method.tag}
                    </span>
                    <p className="text-xs text-sage-700 leading-relaxed">{method.desc}</p>
                  </div>

                  <div className="text-[11px] font-bold text-forest-700 flex items-center gap-1">
                    {selectedMethod === method.id ? 'Selected Platform' : 'Click to Select'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-ivory-300">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
            >
              Select Appointment Slot <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: DATE & TIME SLOT (WITH 15-MIN RESERVATION LOCK) */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 4: Select Consultation Date & Time</h2>
            <p className="text-xs text-sage-700">
              Slots are calculated in Indian Standard Time (IST). When you choose a slot, it is temporarily locked for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-forest-950">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xs font-semibold text-forest-950 focus:ring-2 focus:ring-forest-600"
              />
              <div className="p-3 bg-ivory-100 rounded-xl text-[11px] text-sage-700 space-y-1">
                <p className="font-semibold text-forest-950">Dr. Harihar's Weekly Shift:</p>
                <p>Morning: 10:00 AM – 1:00 PM</p>
                <p>Evening: 4:30 PM – 7:30 PM</p>
                <p>Monday to Saturday</p>
              </div>
            </div>

            <div className="sm:col-span-2 space-y-3">
              <label className="block text-xs font-semibold text-forest-950">
                Available Slots on {selectedDate} (IST)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  '10:00 AM - 10:25 AM IST',
                  '10:30 AM - 10:55 AM IST',
                  '11:00 AM - 11:25 AM IST',
                  '11:30 AM - 11:55 AM IST',
                  '12:00 PM - 12:25 PM IST',
                  '12:30 PM - 12:55 PM IST',
                  '04:30 PM - 04:55 PM IST',
                  '05:00 PM - 05:25 PM IST',
                  '05:30 PM - 05:55 PM IST',
                ].map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectSlotAndLock(slot)}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      selectedSlot === slot
                        ? 'bg-forest-900 text-ivory-50 border-forest-900 font-bold shadow-md'
                        : 'bg-white border-ivory-300 text-forest-950 hover:border-forest-400'
                    }`}
                  >
                    {slot.replace(' IST', '')}
                  </button>
                ))}
              </div>

              {slotReserved && (
                <div className="p-3 bg-forest-50 border border-forest-200 rounded-xl text-xs text-forest-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-forest-600" />
                    <strong>{selectedSlot}</strong> is reserved for you.
                  </span>
                  <span className="font-bold text-sand-800">
                    Expires in {formatCountdown(timeLeft)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-ivory-300">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Method
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
            >
              Fill Medical Intake Form <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 5: MEDICAL INTAKE FORM & PHOTOGRAPH UPLOADS */}
      {/* ======================================================== */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 5: Clinical Intake & Skin Photographs</h2>
            <p className="text-xs text-sage-700">
              Dr. Harihar reviews these answers and photographs before joining your video call to ensure diagnostic accuracy.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">
                1. What skin or hair problem are you experiencing? *
              </label>
              <textarea
                rows={2}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  2. How long have you had this problem? *
                </label>
                <input
                  type="text"
                  value={problemDuration}
                  onChange={(e) => setProblemDuration(e.target.value)}
                  placeholder="e.g. 4 months, 2 weeks"
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  3. Associated Symptoms (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  <label className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-ivory-100 border border-ivory-300">
                    <input
                      type="checkbox"
                      checked={symptomItching}
                      onChange={(e) => setSymptomItching(e.target.checked)}
                      className="rounded text-forest-700"
                    />
                    <span>Itching / Pruritus</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-ivory-100 border border-ivory-300">
                    <input
                      type="checkbox"
                      checked={symptomPain}
                      onChange={(e) => setSymptomPain(e.target.checked)}
                      className="rounded text-forest-700"
                    />
                    <span>Pain / Tenderness</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-ivory-100 border border-ivory-300">
                    <input
                      type="checkbox"
                      checked={symptomInflammation}
                      onChange={(e) => setSymptomInflammation(e.target.checked)}
                      className="rounded text-forest-700"
                    />
                    <span>Redness / Inflammation</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  4. Previous Treatments or Creams Used
                </label>
                <input
                  type="text"
                  value={treatmentsTried}
                  onChange={(e) => setTreatmentsTried(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-forest-950 mb-1">
                  5. Known Drug Allergies *
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Sulfa, None"
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>

            {/* Skin Photo & File Upload */}
            <div className="p-5 rounded-2xl bg-ivory-100 border border-ivory-300 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-forest-950 text-xs">
                    Upload Skin Photographs or Lab Reports
                  </h4>
                  <p className="text-[11px] text-sage-700">
                    Take high-resolution photos in bright daylight. Stored in encrypted private S3 storage.
                  </p>
                </div>

                <label className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-forest-900 bg-white hover:bg-ivory-200 border border-ivory-300 rounded-xl cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5" /> Attach Photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setUploadedFiles((prev) => [
                          ...prev,
                          {
                            name: file.name,
                            type: bodyAreaTag || 'Skin Photo',
                            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                          },
                        ]);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Uploaded Files Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {uploadedFiles.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-ivory-300 rounded-lg text-forest-900 text-[11px] font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5 text-forest-600" />
                    <span>{f.name}</span>
                    <span className="text-sage-500 font-normal">({f.size})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Informed Consent */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="telemedConsent"
                checked={consentAgreed}
                onChange={(e) => setConsentAgreed(e.target.checked)}
                className="mt-0.5 rounded text-forest-700"
              />
              <label htmlFor="telemedConsent" className="text-[11px] text-sage-800 leading-relaxed">
                I hereby declare that the medical information provided is accurate and provide explicit consent for video consultation under the NMC Telemedicine Practice Guidelines (2020) and data handling under the DPDP Act 2023.
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-ivory-300">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Slots
            </button>
            <button
              type="button"
              disabled={!consentAgreed || !problemDescription}
              onClick={() => setCurrentStep(6)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 disabled:opacity-50 rounded-xl shadow-md transition-all"
            >
              Review Booking Summary <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 6: BOOKING SUMMARY & ONLINE PAYMENT (RAZORPAY) */}
      {/* ======================================================== */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-premium space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-forest-950">Step 6: Booking Summary & Payment</h2>
            <p className="text-xs text-sage-700">
              Review details and complete 100% verified payment via Razorpay.
            </p>
          </div>

          <div className="bg-ivory-100 rounded-3xl p-6 border border-ivory-300 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-ivory-300">
              <div>
                <p className="text-sage-700">Consulting Dermatologist</p>
                <p className="font-bold text-forest-950 text-sm">{doctor.fullName}</p>
                <p className="text-sage-600">{doctor.qualificationString}</p>
              </div>

              <div>
                <p className="text-sage-700">Selected Service</p>
                <p className="font-bold text-forest-950 text-sm">{selectedService.name}</p>
                <p className="text-sage-600">{selectedService.durationMinutes} Minutes Consultation</p>
              </div>

              <div>
                <p className="text-sage-700">Date & Slot</p>
                <p className="font-bold text-forest-950">{selectedDate}</p>
                <p className="text-forest-900 font-semibold">{selectedSlot}</p>
              </div>

              <div>
                <p className="text-sage-700">Consultation Platform</p>
                <p className="font-bold text-forest-900 uppercase">{selectedMethod.replace('_', ' ')}</p>
                <p className="text-sage-600">Encrypted 1-on-1 Link Prepared Upon Payment</p>
              </div>

              <div>
                <p className="text-sage-700">Patient Details</p>
                <p className="font-bold text-forest-950">{patientName} ({patientGender}, DOB: {patientDob})</p>
                <p className="text-sage-600">{patientPhone} • {patientEmail}</p>
              </div>

              <div>
                <p className="text-sage-700">Uploaded Documents</p>
                <p className="font-bold text-forest-950">{uploadedFiles.length} files attached</p>
                <p className="text-sage-600">Photos will be reviewed by Dr. Harihar</p>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-sage-800">
                <span>Dermatology Consultation Base Fee</span>
                <span>{formatINR(Math.round(selectedService.priceInPaise / 1.18))}</span>
              </div>
              <div className="flex justify-between text-sage-800">
                <span>Applicable GST (18%)</span>
                <span>{formatINR(selectedService.priceInPaise - Math.round(selectedService.priceInPaise / 1.18))}</span>
              </div>
              <div className="pt-2 border-t border-ivory-300 flex justify-between items-center text-sm">
                <span className="font-bold text-forest-950">Total Payable Amount:</span>
                <span className="text-2xl font-extrabold text-forest-900">
                  {formatINR(selectedService.priceInPaise)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment CTA */}
          <div className="p-5 rounded-2xl bg-forest-50 border border-forest-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-forest-900">
              <p className="font-bold flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-forest-700" />
                Razorpay Secure Checkout
              </p>
              <p className="text-sage-700 text-[11px]">
                Supports UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking.
              </p>
            </div>

            <button
              type="button"
              disabled={isPaying}
              onClick={handleProcessRazorpayPayment}
              className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 active:bg-forest-950 disabled:opacity-50 rounded-xl shadow-lg shadow-forest-950/20 transition-all hover:scale-105 shrink-0"
            >
              {isPaying ? 'Verifying Payment...' : `Pay ${formatINR(selectedService.priceInPaise)} & Confirm Booking`}
            </button>
          </div>

          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sage-700 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Intake Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
