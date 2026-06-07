'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { RegisterFormSection } from '../_sections/register-form.section';
import { GhibliCard } from '@/components/molecules/ghibli-card';

export default function RegisterContainer() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GhibliCard className="w-full max-w-md" hover={false}>
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Leaf className="size-8 text-primary" />
          <h1 className="font-serif text-2xl font-semibold">Buat Akun</h1>
          <p className="text-sm text-muted-foreground">
            Mulai perjalanan produktivitasmu
          </p>
        </div>
        <RegisterFormSection />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Masuk di sini
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link href="/home" className="text-muted-foreground hover:text-primary">
            ← Kembali ke beranda
          </Link>
        </p>
      </GhibliCard>
    </div>
  );
}
