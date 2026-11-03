import { PrismaClient, UserRole, Gender } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DermaCare database...');

  // 1. Create Doctor User & Profile
  const doctorUser = await prisma.user.upsert({
    where: { phoneNumber: '+919876543210' },
    update: {},
    create: {
      phoneNumber: '+919876543210',
      email: 'dr.harihar@dermacare.in',
      fullName: 'Dr. Harihar Sharma',
      role: UserRole.DOCTOR,
      // Default hashed password (e.g. bcrypt for 'Doctor@123')
      passwordHash: '$2b$10$wN9aL4jF5j015z71q7u6.O2xZ/g6V7W53c7qTf.X0z93i00X3tW2i',
      isActive: true,
      doctor: {
        create: {
          nmcRegistrationNumber: 'NMC/MCI/2015/78412',
          stateMedicalCouncil: 'Delhi Medical Council',
          qualificationString: 'MBBS (AIIMS), MD (Dermatology, Venereology & Leprosy)',
          specialties: [
            'Clinical Dermatology',
            'Acne & Post-Acne Scarring',
            'Trichology & Androgenetic Alopecia',
            'Pigmentary Disorders & Melasma',
            'Atopic Dermatitis & Psoriasis',
            'Pediatric Dermatology'
          ],
          bio: 'Dr. Harihar Sharma is a senior consultant dermatologist with over 11 years of clinical excellence in treating chronic skin, hair, and nail conditions. Trained at AIIMS, he blends evidence-based medicine with tailored topical and systemic regimens for long-lasting skin recovery.',
          experienceYears: 11,
          consultationFeePaise: 99900, // ₹999.00
          profileImageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop'
        }
      }
    },
    include: { doctor: true }
  });

  const doctorId = doctorUser.doctor!.id;
  console.log(`Created/Verified Doctor: ${doctorUser.fullName} (ID: ${doctorId})`);

  // 2. Create Consultation Services
  const services = [
    {
      name: 'Acne & Acne Scars Consultation',
      slug: 'acne-and-acne-scars',
      description: 'Comprehensive evaluation of active acne (papules, pustules, cysts) and post-inflammatory erythema/hyperpigmentation with personalized topical and oral management plans.',
      durationMinutes: 25,
      priceInPaise: 99900,
      features: [
        'Detailed facial photo assessment',
        'Topical retinoid & active ingredient prescription',
        'Dietary & hormonal trigger screening',
        'Customized AM/PM skincare routine'
      ]
    },
    {
      name: 'Hair Fall & Scalp Health Consultation',
      slug: 'hair-fall-scalp-evaluation',
      description: 'Scientific trichology consult for telogen effluvium, androgenetic alopecia (pattern hair loss), dandruff, and seborrheic dermatitis with lab work recommendation.',
      durationMinutes: 25,
      priceInPaise: 119900,
      features: [
        'Scalp partition photo review',
        'Nutritional deficiency blood panel guidance',
        'Topical minoxidil / peptide plan',
        'Lifestyle & stress trigger assessment'
      ]
    },
    {
      name: 'General Dermatology & Rash Assessment',
      slug: 'general-dermatology-eczema-rash',
      description: 'Diagnosis and relief protocols for acute or chronic skin conditions including eczema, urticaria (hives), psoriasis, fungal infections, and contact allergies.',
      durationMinutes: 20,
      priceInPaise: 89900,
      features: [
        'Symptom & itch trigger analysis',
        'Immediate anti-inflammatory prescription',
        'Skin barrier repair guidance',
        'Guidance on allergy avoidance'
      ]
    },
    {
      name: 'Pigmentation & Melasma Protocol',
      slug: 'pigmentation-and-melasma',
      description: 'Targeted medical management for stubborn melasma, sun damage, and post-inflammatory hyperpigmentation using safe tyrosinase inhibitors and photoprotection.',
      durationMinutes: 25,
      priceInPaise: 109900,
      features: [
        'Hyperpigmentation depth evaluation',
        'Strict broad-spectrum UV protection regimen',
        'Evidence-backed depigmenting topical actives',
        'Maintenance protocol to prevent rebound'
      ]
    },
    {
      name: 'Follow-up Consultation Review',
      slug: 'follow-up-consultation',
      description: 'Progress evaluation for existing patients within 30 days of initial consultation to adjust dosages, assess skin tolerance, and renew prescriptions.',
      durationMinutes: 15,
      priceInPaise: 59900,
      features: [
        'Review of treatment response & side-effects',
        'Dosage titrations & medication renewals',
        'Next-phase skincare routine adaptation'
      ]
    }
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        description: s.description,
        durationMinutes: s.durationMinutes,
        priceInPaise: s.priceInPaise,
        features: s.features,
        isActive: true
      },
      create: s
    });
  }
  console.log(`Seeded ${services.length} dermatology services`);

  // 3. Weekly Availability for Doctor (Monday to Saturday)
  // Day of week: 1 (Mon) to 6 (Sat)
  for (let day = 1; day <= 6; day++) {
    // Morning shift: 10:00 to 13:00 IST
    await prisma.availability.upsert({
      where: {
        id: `avail-morn-${doctorId}-${day}`
      },
      update: {},
      create: {
        id: `avail-morn-${doctorId}-${day}`,
        doctorId,
        dayOfWeek: day,
        startTime: '10:00',
        endTime: '13:00',
        slotDurationMinutes: 25,
        isAvailable: true
      }
    });

    // Evening shift: 16:30 to 19:30 IST
    await prisma.availability.upsert({
      where: {
        id: `avail-eve-${doctorId}-${day}`
      },
      update: {},
      create: {
        id: `avail-eve-${doctorId}-${day}`,
        doctorId,
        dayOfWeek: day,
        startTime: '16:30',
        endTime: '19:30',
        slotDurationMinutes: 25,
        isAvailable: true
      }
    });
  }
  console.log('Seeded standard weekly doctor availability (Mon-Sat 10:00-13:00 & 16:30-19:30 IST)');

  // 4. Create Test Patient
  const patientUser = await prisma.user.upsert({
    where: { phoneNumber: '+919123456789' },
    update: {},
    create: {
      phoneNumber: '+919123456789',
      email: 'rohit.mehta@example.com',
      fullName: 'Rohit Mehta',
      role: UserRole.PATIENT,
      passwordHash: '$2b$10$wN9aL4jF5j015z71q7u6.O2xZ/g6V7W53c7qTf.X0z93i00X3tW2i',
      patient: {
        create: {
          dateOfBirth: new Date('1996-08-15'),
          gender: Gender.MALE,
          bloodGroup: 'B+',
          city: 'Bengaluru',
          state: 'Karnataka',
          allergies: ['Penicillin'],
          chronicConditions: []
        }
      }
    }
  });
  console.log(`Seeded Test Patient: ${patientUser.fullName}`);

  console.log('DermaCare seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

