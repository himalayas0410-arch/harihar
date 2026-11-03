import React from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { fallbackServices } from '@/lib/api';
import { formatINR } from '@/lib/utils';

export default function ServicesPage() {
  const services = fallbackServices;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#FAF8F5]">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
          Comprehensive Clinical Services
        </span>
        <h1 className="text-4xl font-extrabold text-forest-950 tracking-tight">
          Specialized Dermatology Consultations
        </h1>
        <p className="text-forest-900/75 text-sm sm:text-base">
          Every consultation is conducted directly by Dr. Harihar Sharma and includes a structured examination, clinical diagnosis, personalized prescription, and follow-up guidance.
        </p>
      </div>

      <div className="space-y-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.slug}
            className="bg-white rounded-3xl border border-ivory-300 p-8 sm:p-10 shadow-premium hover:shadow-premium-hover transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2.5 py-1 rounded-md">
                  Service 0{index + 1}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-600">
                  <Clock className="w-3.5 h-3.5 text-sage-500" />
                  {service.durationMinutes} Minutes Consultation
                </span>
              </div>

              <h2 className="text-2xl font-bold text-forest-950">
                {service.name}
              </h2>

              <p className="text-sm text-forest-900/75 leading-relaxed">
                {service.description}
              </p>

              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-forest-950">
                  What is included in this consultation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-forest-900/80">
                      <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-ivory-100 p-6 sm:p-8 rounded-3xl border border-ivory-200 flex flex-col justify-between items-center text-center space-y-4">
              <div>
                <p className="text-xs text-sage-600 font-medium">Consultation Fee</p>
                <p className="text-3xl font-extrabold text-forest-950">
                  {formatINR(service.priceInPaise)}
                </p>
                <p className="text-[11px] text-sage-600 mt-1">Includes 18% GST & Digital Rx</p>
              </div>

              <Link
                href={`/book?service=${service.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all"
              >
                Book This Consult <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
