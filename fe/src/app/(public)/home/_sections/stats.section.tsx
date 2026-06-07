'use client';

import { useGsapStagger } from '@/hooks/useGsapStagger';

const STATS = [
  { value: '10K+', label: 'Pengguna Aktif' },
  { value: '500+', label: 'Artikel & Tips' },
  { value: '99%', label: 'Uptime PWA' },
  { value: '24/7', label: 'Akses Offline-ready' },
];

export function StatsSection() {
  const ref = useGsapStagger<HTMLDivElement>([]);

  return (
    <section className="border-y border-white/5 bg-white/[0.02] px-4 py-12 md:px-6">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} data-stagger-item className="text-center">
            <p className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
