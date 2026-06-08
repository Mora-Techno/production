'use client';

import { Leaf } from 'lucide-react';
import Link from 'next/link';

import { GhibliCard } from '@/components/molecules/ghibli-card';

import { LoginFormSection } from '../_sections/login-form.section';

export default function LoginContainer() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <GhibliCard className="w-full max-w-md" hover={false}>
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Leaf className="size-8 text-primary" />
          <h1 className="font-serif text-2xl font-semibold">Selamat Datang</h1>
          <p className="text-sm text-muted-foreground">Masuk ke PWA Produktivitas bertema Ghibli</p>
        </div>
        <LoginFormSection />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Daftar sekarang
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
