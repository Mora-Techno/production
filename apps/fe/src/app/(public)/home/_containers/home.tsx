'use client';

import NavLayout from '@/core/layouts/nav.layout';

import { CtaSection } from '../_sections/cta.section';
import { FeaturesSection } from '../_sections/features.section';
import { HeroSection } from '../_sections/hero.section';
import { ShowcaseSection } from '../_sections/showcase.section';
import { StatsSection } from '../_sections/stats.section';

export default function ContainerHome() {
  return (
    <NavLayout>
      <div className="landing-dark min-h-screen bg-[#0B0F19] pt-24 text-white">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ShowcaseSection />
        <CtaSection />
      </div>
    </NavLayout>
  );
}
