'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import AppFooter from '../components/app-footer';
import AppHeader from '../components/app-header';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <main className="flex flex-col min-h-screen w-full">
      <AppHeader
        state={{
          isScrolled: isScrolled,
          pathname: pathname,
          setIsScrolled: setIsScrolled,
        }}
      />
      <div className="flex-1">{children}</div>
      <AppFooter />
    </main>
  );
}
