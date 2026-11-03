import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Is an online dermatology consultation legally valid in India?',
      a: 'Yes, absolutely. DermaCare strictly complies with the Telemedicine Practice Guidelines issued on March 25, 2020, by the Board of Governors in supersession of the Medical Council of India (now National Medical Commission - NMC). Dr. Harihar Sharma is an NMC-registered Registered Medical Practitioner (RMP).',
    },
    {
      q: 'Will my digital prescription be accepted by local pharmacies and chemist shops?',
      a: 'Yes. Every prescription issued through DermaCare bears the doctor’s full name, qualifications, NMC/State Medical Council registration number, cryptographic digital seal, and contact details as required by Indian law. It is legally valid at all pharmacies across India.',
    },
    {
      q: 'Can Dr. Harihar prescribe all medications via telemedicine?',
      a: 'In accordance with NMC Telemedicine Guidelines, dermatologists can prescribe List O (over-the-counter), List A (first-line antibiotics, topical retinoids, antihistamines, antifungals, corticosteroids), and List B (refills for chronic conditions) via video consultation. Restricted medications under Schedule X / narcotics cannot and will not be prescribed.',
    },
    {
      q: 'Which video platforms are supported for my consultation?',
      a: 'When booking, you can choose between Google Meet, Zoom, or WhatsApp Direct Video Call according to your device convenience. The meeting link is immediately generated upon confirmed payment.',
    },
    {
      q: 'How should I take photographs of my skin/hair before the call?',
      a: 'Take clear, close-up photographs in bright natural daylight (near a window). Avoid artificial yellow light, direct flash glare, or camera beauty filters. You can upload these securely in your Patient Portal prior to your appointment.',
    },
    {
      q: 'What is the policy for follow-up reviews?',
      a: 'Patients who have completed a full consultation are eligible for a Follow-up Consultation Review within 30 days at a reduced fee of ₹599 to assess tolerance, review lab reports, and renew topical formulations.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-[#FAF8F5]">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
          Frequently Asked Questions
        </span>
        <h1 className="text-4xl font-extrabold text-forest-950 tracking-tight">
          Everything You Need to Know
        </h1>
        <p className="text-forest-900/75 text-sm sm:text-base">
          Clear answers regarding Indian telemedicine regulations, prescription validity, and video appointments.
        </p>
      </div>

      <div className="space-y-5">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-premium space-y-3"
          >
            <h3 className="text-base sm:text-lg font-bold text-forest-950 flex items-start gap-3">
              <span className="text-forest-700 font-extrabold">Q.</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-forest-900/75 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-ivory-200/80 p-8 rounded-3xl text-center space-y-4 border border-ivory-300">
        <h4 className="text-base font-bold text-forest-950">Have a specific question not listed here?</h4>
        <p className="text-xs text-sage-700">Our patient coordination desk is available on WhatsApp.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl transition-colors"
        >
          Contact Patient Helpdesk <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
