import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-[#FAF8F5]">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100/70 border border-forest-200 px-3.5 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-forest-950 tracking-tight">
          Clinic Contact & Patient Support
        </h1>
        <p className="text-forest-900/75 text-sm max-w-xl mx-auto">
          Need help scheduling your consultation or accessing your digital prescription? Our patient desk is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-ivory-300 shadow-premium flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-forest-950">WhatsApp Patient Desk</h3>
              <p className="text-xs text-sage-700">Quick answers for booking, rescheduling, and tech support.</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 text-sm font-bold text-forest-800 hover:underline"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ivory-300 shadow-premium flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-forest-950">Clinical Email Support</h3>
              <p className="text-xs text-sage-700">For billing queries, corporate health, and administrative questions.</p>
              <a
                href="mailto:clinic@dermacare.in"
                className="inline-block pt-1 text-sm font-bold text-forest-800 hover:underline"
              >
                clinic@dermacare.in
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ivory-300 shadow-premium flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-ivory-200 text-forest-900 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-forest-950">Consultation Hours (IST)</h3>
              <p className="text-xs text-sage-700">Monday to Saturday: 10:00 AM – 1:00 PM & 4:30 PM – 7:30 PM</p>
              <p className="text-xs text-sage-500">Sunday: Closed for routine appointments</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white p-8 rounded-3xl border border-ivory-300 shadow-premium space-y-5">
          <h3 className="text-xl font-bold text-forest-950">Send an Enquiry</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forest-950 mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ananya Sen"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-ivory-300 bg-ivory-50 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-950 mb-1">Mobile Number (WhatsApp)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-ivory-300 bg-ivory-50 focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-950 mb-1">Message or Query</label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-ivory-300 bg-ivory-50 focus:outline-none focus:ring-2 focus:ring-forest-600"
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full py-3 text-xs font-bold text-ivory-50 bg-forest-900 hover:bg-forest-800 rounded-xl transition-colors shadow-md"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
