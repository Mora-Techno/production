'use client';

// import not valid
import ResourceHeroSection from '@/components/page/public/resource/HeroSection';
import NavLayout from '@/core/layouts/nav.layout';

const ResourceContainer = () => {
  return (
    <NavLayout>
      <main className="w-full min-h-screen">
        <ResourceHeroSection
          template={{
            desc: 'Initial Resource',
            title: 'Resouce',
          }}
        />
      </main>
    </NavLayout>
  );
};

export default ResourceContainer;
