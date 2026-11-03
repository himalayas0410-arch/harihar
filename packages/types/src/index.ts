export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

export enum AppointmentStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
  NO_SHOW = 'NO_SHOW'
}

export enum MeetingProvider {
  GOOGLE_MEET = 'GOOGLE_MEET',
  ZOOM = 'ZOOM',
  WHATSAPP = 'WHATSAPP'
}

export enum PaymentStatus {
  CREATED = 'CREATED',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PrescriptionStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  REVOKED = 'REVOKED'
}

export enum DosageForm {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  CREAM = 'CREAM',
  OINTMENT = 'OINTMENT',
  GEL = 'GEL',
  LOTION = 'LOTION',
  SERUM = 'SERUM',
  SOLUTION = 'SOLUTION',
  SOAP_CLEANSER = 'SOAP_CLEANSER',
  SUNSCREEN = 'SUNSCREEN',
  INJECTION = 'INJECTION'
}

export enum MedicalRecordType {
  SKIN_PHOTO = 'SKIN_PHOTO',
  LAB_REPORT = 'LAB_REPORT',
  BIOPSY_REPORT = 'BIOPSY_REPORT',
  PRIOR_PRESCRIPTION = 'PRIOR_PRESCRIPTION',
  CLINICAL_IMAGE = 'CLINICAL_IMAGE',
  OTHER = 'OTHER'
}

// User and Profiles
export interface UserDto {
  id: string;
  phoneNumber: string;
  email?: string | null;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface PatientDto {
  id: string;
  userId: string;
  dateOfBirth?: string | null;
  gender?: Gender | null;
  bloodGroup?: string | null;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact?: string | null;
  city?: string | null;
  state?: string | null;
}

export interface DoctorDto {
  id: string;
  userId: string;
  nmcRegistrationNumber: string;
  stateMedicalCouncil: string;
  qualificationString: string;
  specialties: string[];
  bio: string;
  experienceYears: number;
  consultationFeePaise: number;
  profileImageUrl?: string | null;
  fullName: string;
  email?: string | null;
}

// Service Catalog
export interface ServiceDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  priceInPaise: number;
  isActive: boolean;
  features: string[];
}

// Availability & Slots
export interface AvailabilitySlot {
  slotStartTime: string; // ISO 8601 UTC
  slotEndTime: string;   // ISO 8601 UTC
  isAvailable: boolean;
  dayOfWeek: number;
  formattedTimeIST: string;
}

// Appointments
export interface AppointmentDto {
  id: string;
  appointmentNumber: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  slotStartTime: string;
  slotEndTime: string;
  status: AppointmentStatus;
  slotLockedUntil?: string | null;
  chiefComplaint?: string | null;
  meetingProvider: MeetingProvider;
  meetingJoinUrl?: string | null;
  meetingHostUrl?: string | null;
  patient?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    gender?: Gender | null;
    dateOfBirth?: string | null;
  };
  service?: {
    id: string;
    name: string;
    priceInPaise: number;
    durationMinutes: number;
  };
}

// Prescriptions
export interface PrescriptionItemDto {
  id?: string;
  medicineName: string;
  genericName?: string;
  dosageForm: DosageForm;
  strength?: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions?: string;
  sortOrder?: number;
}

export interface PrescriptionDto {
  id: string;
  prescriptionNumber: string;
  consultationId: string;
  patientId: string;
  doctorId: string;
  status: PrescriptionStatus;
  version: number;
  pdfStoragePath?: string | null;
  doctorSignatureHash?: string | null;
  approvedAt?: string | null;
  validUntil?: string | null;
  items: PrescriptionItemDto[];
  doctor?: DoctorDto;
  patient?: PatientDto;
}

// Razorpay Payments
export interface RazorpayOrderDto {
  orderId: string;
  amountInPaise: number;
  currency: string;
  keyId: string;
  appointmentId: string;
  appointmentNumber: string;
}

export interface RazorpayVerifyDto {
  appointmentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

// Medical Records
export interface MedicalRecordDto {
  id: string;
  patientId: string;
  recordType: MedicalRecordType;
  title: string;
  description?: string | null;
  fileSizeBytes: number;
  mimeType: string;
  downloadUrl?: string;
  createdAt: string;
}

// Currency formatting helpers
export const formatPaiseToINR = (paise: number): string => {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2
  }).format(rupees);
};

// IST Date Formatting
export const formatToIST = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

