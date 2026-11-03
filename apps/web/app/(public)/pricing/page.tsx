import React from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { fallbackServices } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function PricingPage() {
  const services = fallbackServices;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#FAF8F5]">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
          Transparent Telemedicine Fees
        </span>
        <h1 className="text-4xl font-extrabold text-forest-950 tracking-tight">
          Simple, Fair Pricing with Zero Hidden Extras
        </h1>
        <p className="text-forest-900/75 text-sm sm:text-base">
          All charges are in Indian Rupees (INR). Payments are processed securely via Razorpay with automated tax receipts.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.slice(0, 3).map((service, i) => (
          <div
            key={service.id}
            className={`rounded-3xl p-8 border flex flex-col justify-between space-y-8 ${
              i === 0
                ? 'bg-white border-forest-600 shadow-xl ring-2 ring-forest-600/20'
                : 'bg-white border-ivory-300 shadow-premium'
            }`}
          >
            <div className="space-y-4">
              {i === 0 && (
                <span className="inline-block px-3 py-1 bg-forest-900 text-sand-300 text-[11px] font-bold uppercase tracking-wider rounded-full">
                  Most Requested
                </span>
              )}
              <h3 className="text-xl font-bold text-forest-950">{service.name}</h3>
              <p className="text-xs text-forest-900/70">{service.description}</p>
              <div>
                <span className="text-3xl font-extrabold text-forest-950">
                  {formatINR(service.priceInPaise)}
                </span>
                <span className="text-xs text-sage-600 font-medium"> / {service.durationMinutes} mins</span>
              </div>

              <div className="pt-4 border-t border-ivory-200 space-y-2.5">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-forest-900/80">
                    <Check className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/book?service=${service.slug}`}
              className={`w-full py-3 text-center text-xs font-bold rounded-xl transition-all ${
                i === 0
                  ? 'bg-forest-900 hover:bg-forest-800 text-ivory-50 shadow-md'
                  : 'bg-ivory-200 hover:bg-ivory-300 text-forest-950'
              }`}
            >
              Book Consultation
            </Link>
          </div>
        ))}
      </div>

      {/* Refund and Cancellation Terms */}
      <div id="refunds" className="bg-white rounded-3xl border border-ivory-300 p-8 sm:p-10 shadow-premium space-y-6">
        <h3 className="text-2xl font-bold text-forest-950">Cancellation & Refund Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-forest-900/75 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-forest-950 text-sm">Patient Cancellation & Rescheduling</h4>
            <p>
              Appointments can be rescheduled or cancelled up to <strong>2 hours</strong> prior to the scheduled slot without penalty. In case of cancellation before this window, a 100% refund is initiated back to your original payment method within 5–7 business days via Razorpay.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-forest-950 text-sm">Doctor Reschedule / Technical Failure</h4>
            <p>
              In the rare event that Dr. Harihar is called for an emergency or experiences severe connectivity disruption, the patient is offered either an immediate priority reschedule or a complete 100% refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
