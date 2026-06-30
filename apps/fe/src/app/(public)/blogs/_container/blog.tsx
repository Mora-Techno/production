'use client';

import BlogSection from '@/components/page/public/blog/HeroSection';
import NavLayout from '@/core/layouts/nav.layout';

const BlogsContainer = () => {
  return (
    <NavLayout>
      <main className="w-full min-h-screen">
        <BlogSection
          template={{
            desc: 'Initial Blogs',
            title: 'Blogs',
          }}
        />
      </main>
    </NavLayout>
  );
};

export default BlogsContainer;
