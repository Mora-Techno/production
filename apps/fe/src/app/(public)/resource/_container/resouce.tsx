"use client";

import NavLayout from "@/core/layouts/nav.layout";
// import not valid
import ResourceHeroSection from "@/components/page/public/resource/HeroSection";

const ResourceContainer = () => {
  return (
    <NavLayout>
      <main className="w-full min-h-screen">
        <ResourceHeroSection
          template={{
            desc: "Initial Resource",
            title: "Resouce",
          }}
        />
      </main>
    </NavLayout>
  );
};

export default ResourceContainer;
