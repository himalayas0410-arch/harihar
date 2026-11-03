import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole, Gender } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class RegisterPatientDto {
  phoneNumber: string;
  fullName: string;
  email?: string;
  password?: string;
  gender?: Gender;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  allergies?: string[];
}

export class LoginDto {
  phoneNumber: string;
  password?: string;
  otp?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerPatient(dto: RegisterPatientDto) {
    const existing = await this.prisma.user.findUnique({
      where: { phoneNumber: dto.phoneNumber },
    });

    if (existing) {
      throw new ConflictException('A user with this mobile number already exists. Please log in.');
    }

    const saltRounds = 10;
    const passwordHash = dto.password ? await bcrypt.hash(dto.password, saltRounds) : null;

    const user = await this.prisma.user.create({
      data: {
        phoneNumber: dto.phoneNumber,
        fullName: dto.fullName,
        email: dto.email || null,
        passwordHash,
        role: UserRole.PATIENT,
        patient: {
          create: {
            gender: dto.gender || null,
            dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
            city: dto.city || null,
            state: dto.state || null,
            allergies: dto.allergies || [],
          },
        },
        consents: {
          create: {
            consentType: 'TELEMEDICINE_TREATMENT_AGREEMENT',
            consentGiven: true,
            version: 'v1.0',
            ipAddress: '127.0.0.1',
            userAgent: 'DermaCare Web Client',
          },
        },
      },
      include: {
        patient: true,
      },
    });

    const token = this.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        patientId: user.patient?.id,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: dto.phoneNumber },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid phone number or user not found');
    }

    // For password verification:
    if (dto.password && user.passwordHash) {
      const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }
    } else if (dto.otp) {
      // In production, verify SMS OTP. For test/demo environment, accept "123456"
      if (dto.otp !== '123456' && dto.otp !== '999999') {
        throw new UnauthorizedException('Invalid OTP. Use test OTP: 123456');
      }
    } else {
      throw new BadRequestException('Either password or OTP must be provided');
    }

    const token = this.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        doctorId: user.doctor?.id,
        patientId: user.patient?.id,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      doctor: user.doctor,
      patient: user.patient,
    };
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}

