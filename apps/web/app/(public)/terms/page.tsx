import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Telemedicine Informed Consent & Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          In compliance with the Telemedicine Practice Guidelines (2020) issued by the Medical Council of India / National Medical Commission (NMC).
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Nature of Telemedicine Consultation</h2>
          <p>
            By booking and attending a consultation on DermaCare, you understand that telemedicine involves the delivery of healthcare services using information and communication technologies (video, audio, high-resolution skin photographs) where the doctor and patient are not in the same physical location.
          </p>
          <p>
            You acknowledge that telemedicine has inherent limitations compared to an in-person physical clinical palpation or dermoscopic examination. In situations where Dr. Harihar Sharma determines that a physical examination or biopsy is clinically necessary, you will be advised to visit an in-person dermatology clinic.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Patient Rights & Medical Confidentiality</h2>
          <p>
            As a patient, you retain the right to withdraw consent at any time. All medical histories, symptoms, clinical photographs, and prescriptions are treated as confidential medical records under the Indian Information Technology Act (2000) and the Digital Personal Data Protection Act (2023).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Prescriptions & Medication Guidelines</h2>
          <p>
            Prescriptions issued through this platform conform strictly to the prescription format mandated by NMC Telemedicine Guidelines Appendix 2. They contain the doctor's registration number, patient identification, generic medication names, dosage, duration, and instructions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Emergency Situations</h2>
          <p>
            Telemedicine is not suitable for medical emergencies (such as acute anaphylaxis, Stevens-Johnson syndrome, or severe drug eruptions with systemic shock). If you suspect an emergency, you must immediately contact local emergency services or visit the nearest hospital casualty.
          </p>
        </section>
      </div>
    </div>
  );
}
