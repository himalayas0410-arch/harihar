import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  private readonly fallbackServices = [
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
      isActive: true,
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
      isActive: true,
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
        'Steroid-sparing barrier restoration plan',
        'Emergency escalation thresholds',
        'Pharmacy prescription sent in 15 mins',
      ],
      isActive: true,
    },
  ];

  async getAllActiveServices() {
    try {
      const services = await this.prisma.service.findMany({
        where: { isActive: true },
        orderBy: { priceInPaise: 'asc' },
      });
      if (services.length > 0) return services;
    } catch (e) {
      // Return fallback services
    }
    return this.fallbackServices;
  }

  async getServiceBySlug(slug: string) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { slug },
      });
      if (service) return service;
    } catch (e) {
      // Fall through to fallback
    }
    const fallback = this.fallbackServices.find((s) => s.slug === slug);
    if (!fallback) {
      throw new NotFoundException(`Dermatology service '${slug}' not found`);
    }
    return fallback;
  }
}

