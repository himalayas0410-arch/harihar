import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-jwt-key-replace-in-production-min-32-chars',
    });
  }

  async validate(payload: { sub: string; role: string; phoneNumber: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User does not exist or has been deactivated');
    }

    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      doctorId: user.doctor?.id,
      patientId: user.patient?.id,
    };
  }
}

