import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'DermaCare — Dr. Harihar Sharma | Online Dermatology Consultation',
  description:
    'Consult Dr. Harihar Sharma (MD Dermatology, AIIMS). Book 1-on-1 video consultations for acne, hair fall, eczema, and skin pigmentation with valid digital prescriptions across India.',
  keywords: [
    'Online Dermatologist India',
    'Dr Harihar Sharma',
    'Telemedicine Dermatology',
    'Acne consultation online',
    'Hair fall doctor India',
    'Digital prescription dermatologist',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen text-slate-900 bg-slate-50 antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

