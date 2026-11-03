import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Privacy Policy & Health Data Protection
        </h1>
        <p className="text-xs text-slate-500">
          Compliant with the Digital Personal Data Protection (DPDP) Act 2023 of India.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Data We Collect</h2>
          <p>
            When you register, book a consultation, or upload records on DermaCare, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identity & contact data: Full name, phone number, email address, date of birth, gender.</li>
            <li>Clinical data: Chief dermatological complaints, medical history, past allergies, and medications.</li>
            <li>Uploaded documents: Skin photographs, prior prescriptions, and pathology/biopsy reports.</li>
            <li>Transaction data: Razorpay order ID, payment status, and timestamp. (We never store credit card or bank credentials on our servers).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Storage & Encryption of Medical Records</h2>
          <p>
            All uploaded patient documents and skin images are stored in private, server-side encrypted S3-compatible cloud storage buckets. Access is governed by strict role-based authorization: only the patient and Dr. Harihar Sharma can view these files using temporary, expiring pre-signed URLs (valid for 15 minutes).
          </p>
          <p>
            We strictly prohibit any public display, indexing, or commercial sharing of patient skin photographs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Audit Logging & Data Retention</h2>
          <p>
            In compliance with Indian medical record retention mandates, consultation records and immutable prescriptions are maintained for the statutory minimum period. Access logs are maintained to record every clinical document access for security auditing.
          </p>
        </section>
      </div>
    </div>
  );
}

