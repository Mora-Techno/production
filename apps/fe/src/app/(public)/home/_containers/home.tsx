"use client";

import NavLayout from "@/core/layouts/nav.layout";
import {
  HeroSection,
  CtaSection,
  FeaturesSection,
  ShowcaseSection,
  StatsSection,
} from "@/components/page/public";
export default function ContainerHome() {
  return (
    <NavLayout>
      <div className="landing-dark min-h-screen bg-background pt-24 ">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ShowcaseSection />
        <CtaSection />
      </div>
    </NavLayout>
  );
}
