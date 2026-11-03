const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const fallbackDoctor = {
  id: 'doc-harihar-001',
  fullName: 'Dr. Harihar Sharma',
  qualificationString: 'MBBS (AIIMS), MD (Dermatology, Venereology & Leprosy)',
  nmcRegistrationNumber: 'NMC/MCI/2015/78412',
  stateMedicalCouncil: 'Delhi Medical Council',
  experienceYears: 11,
  consultationFeePaise: 99900,
  specialties: [
    'Clinical Dermatology',
    'Acne & Acne Scarring',
    'Trichology & Androgenetic Alopecia',
    'Pigmentary Disorders & Melasma',
    'Eczema, Psoriasis & Atopic Skin',
    'Pediatric Dermatology',
  ],
  bio: 'Dr. Harihar Sharma is an AIIMS-trained senior consultant dermatologist with over 11 years of experience treating chronic skin and hair conditions across India. He focuses on root-cause diagnosis, individualized medical therapy, and patient safety under Indian Telemedicine Practice Guidelines.',
  profileImageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
};

export const fallbackServices = [
  {
    id: 'srv-1',
    name: 'Acne & Acne Scars Consultation',
    slug: 'acne-and-acne-scars',
    durationMinutes: 25,
    priceInPaise: 99900,
    description: 'Detailed dermatological assessment of active breakouts, cystic acne, and post-inflammatory erythema/pigmentation.',
    features: [
      'Comprehensive lesion grading',
      'Prescription-grade topical retinoids & actives',
      'Dietary & hormonal screening recommendation',
      'Customized AM & PM barrier repair routine',
    ],
  },
  {
    id: 'srv-2',
    name: 'Hair Fall & Scalp Health Consultation',
    slug: 'hair-fall-scalp-evaluation',
    durationMinutes: 25,
    priceInPaise: 119900,
    description: 'Evidence-based trichology consult for pattern hair loss, telogen effluvium, scalp pruritus, and stubborn dandruff.',
    features: [
      'Scalp partition & density analysis',
      'Targeted blood marker review (Ferritin, Vit D, Thyroid)',
      'Medical hair recovery plan (Minoxidil / Peptides)',
      'Nutritional & anti-inflammatory guidance',
    ],
  },
  {
    id: 'srv-3',
    name: 'General Dermatology & Rash Assessment',
    slug: 'general-dermatology-eczema-rash',
    durationMinutes: 20,
    priceInPaise: 89900,
    description: 'Rapid diagnostic relief for acute skin rashes, fungal infections, allergic dermatitis, urticaria (hives), and psoriasis.',
    features: [
      'Symptom & itch trigger mapping',
      'Non-sedating antihistamine & topical anti-inflammatory Rx',
      'Gentle ceramide cleanser & barrier protocol',
      'Prevention strategy for recurrence',
    ],
  },
  {
    id: 'srv-4',
    name: 'Pigmentation & Melasma Protocol',
    slug: 'pigmentation-and-melasma',
    durationMinutes: 25,
    priceInPaise: 109900,
    description: 'Medical protocol for persistent epidermal/dermal melasma, tanning, and dark spots with tyrosinase inhibitors.',
    features: [
      'Pigmentation depth & distribution check',
      'Evidence-based tyrosinase inhibitors (Azelaic, Kojic, Cysteamine)',
      'PA++++ broad-spectrum sun-shield regimen',
      'Long-term maintenance without rebound risk',
    ],
  },
  {
    id: 'srv-5',
    name: 'Follow-up Consultation Review',
    slug: 'follow-up-consultation',
    durationMinutes: 15,
    priceInPaise: 59900,
    description: 'Progress evaluation for existing patients within 30 days of initial consultation to adjust dosages and renew prescriptions.',
    features: [
      'Evaluation of skin tolerance & response',
      'Dosage titration & medication renewal',
      'Next phase skincare roadmap',
    ],
  },
];

export async function fetchDoctorProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/doctors/profile`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    // Return fallback
  }
  return fallbackDoctor;
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    // Return fallback
  }
  return fallbackServices;
}
