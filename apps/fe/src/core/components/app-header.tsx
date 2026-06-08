'use client';

import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/atoms/navigation-menu';
import { navigationMenuConfig } from '@/configs/app.config';
import { cn } from '@/utils/classname';

// import UserDropdown from './user.dropdown';
import LanguageDropdown from './language.dropdown';
import NotificationDropdown from './notification.dropdown';
import ThemeToggle from './theme-toggle';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b p-4 backdrop-blur-md transition-all duration-200 md:p-6',
        isScrolled
          ? 'border-white/10 bg-[#0B0F19]/90 shadow-lg shadow-black/20'
          : 'border-transparent bg-[#0B0F19]/70',
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10">
              <Leaf className="size-5 text-orange-400" />
            </div>
            <span className="hidden font-serif text-lg font-semibold sm:inline">Productify</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navigationMenuConfig?.items?.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageDropdown />
          <NotificationDropdown />
          {/* <UserDropdown /> */}
        </div>
      </div>
    </nav>
  );
}
