'use client';

import { ArrowRight, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/atoms';
import { Badge } from '@/components/atoms';
import { useGsapStagger } from '@/hooks/useGsapStagger';

const TAGS = ['Produktivitas', 'Todo', 'Notes', 'Kalender', 'Musik Fokus'];

export function HeroSection() {
  const ref = useGsapStagger<HTMLDivElement>([]);

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 md:px-6 md:pb-28 md:pt-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-[420px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -right-20 top-20 size-[360px] rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl text-center">
        <div data-stagger-item>
          <Badge className="mb-6 border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-orange-300 hover:bg-orange-500/10">
            <Sparkles className="size-3.5" />
            New — PWA Produktivitas FutureTech
          </Badge>
        </div>

        <h1
          data-stagger-item
          className="font-serif text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Jelajahi Masa Depan{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
            Produktivitas Digital
          </span>
        </h1>

        <p
          data-stagger-item
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Kelola tugas, catatan, kalender, dan musik fokus dalam satu PWA yang elegan. Dibangun
          untuk pekerja modern yang menginginkan alur kerja yang tenang namun powerful.
        </p>

        <div
          data-stagger-item
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md"
        >
          <Search className="ml-3 size-5 shrink-0 text-zinc-500" />
          <input
            type="text"
            placeholder="Cari fitur, tips produktivitas..."
            className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 text-white hover:from-orange-400 hover:to-amber-400"
          >
            <Link href="/login">Mulai</Link>
          </Button>
        </div>

        <div data-stagger-item className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-400 transition-colors hover:border-orange-500/30 hover:text-orange-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div data-stagger-item className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400"
          >
            <Link href="/register">
              Buat Akun Gratis <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/login">Masuk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
