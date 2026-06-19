import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms";
import { Badge } from "@/components/atoms";
import { useGsapStagger } from "@/hooks/useGsapStagger";

const TAGS = ["Produktivitas", "Todo", "Notes", "Kalender", "Musik Fokus"];

export function HeroSection() {
  const ref = useGsapStagger<HTMLDivElement>([]);

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 md:px-6 md:pb-28 md:pt-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-20 top-20 size-[360px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl text-center">
        <div data-stagger-item>
          <Badge className="mb-6 border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-orange-300 hover:bg-orange-500/10">
            <Sparkles className="size-3.5" />
            New — Produtify
          </Badge>
        </div>

        <h1
          data-stagger-item
          className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl  lg:text-7xl"
        >
          Jelajahi Masa Depan{" "}
          <span className="bg-gradient-to-r from-primary via-primary/60 to-secondary bg-clip-text text-transparent">
            Produktivitas Digital
          </span>
        </h1>

        <p
          data-stagger-item
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Kelola tugas, catatan, kalender, dan musik fokus dalam satu PWA yang
          elegan. Dibangun untuk pekerja modern yang menginginkan alur kerja
          yang tenang namun powerful.
        </p>

        <div
          data-stagger-item
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md"
        >
          <Search className="ml-3 size-5 shrink-0 " />
          <input
            type="text"
            placeholder="Cari fitur, tips produktivitas..."
            className="flex-1 bg-transparent py-3 text-sm  outline-none placeholder:text-zinc-500"
          />
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-primary/50 to-primary/60 px-5  hover:from-primary/80 hover:to-primary/90"
          >
            <Link href="/login">Mulai</Link>
          </Button>
        </div>

        <div
          data-stagger-item
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs text-zinc-400 cursor-pointer transition-colors hover:border-primary/60 hover:text-primary/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
