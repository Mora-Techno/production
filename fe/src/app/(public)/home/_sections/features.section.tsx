'use client';

import {
  Calendar,
  CheckSquare,
  FileText,
  Music2,
  Zap,
} from 'lucide-react';
import { useGsapStagger } from '@/hooks/useGsapStagger';

const FEATURES = [
  {
    icon: CheckSquare,
    title: 'Smart Todo',
    description:
      'Kelola tugas harian dengan filter status, tenggat waktu, dan centang daun yang elegan.',
  },
  {
    icon: FileText,
    title: 'Rich Notes',
    description:
      'Simpan ide, jurnal, dan snippet kode dengan editor yang nyaman di desktop maupun mobile.',
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    description:
      'Jadwalkan agenda dan lihat event harian dengan kalender interaktif yang responsif.',
  },
  {
    icon: Music2,
    title: 'Focus Music',
    description:
      'Playlist lo-fi Ghibli & Joe Hisaishi untuk menemani sesi kerja fokus kamu.',
  },
];

export function FeaturesSection() {
  const ref = useGsapStagger<HTMLDivElement>([]);

  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
            <Zap className="size-3.5" />
            Fitur Unggulan
          </div>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Semua yang Kamu Butuhkan
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Satu platform untuk produktivitas harian — dari tugas hingga musik
            fokus, dirancang dengan estetika modern dark theme.
          </p>
        </div>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-stagger-item
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 text-orange-400 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
