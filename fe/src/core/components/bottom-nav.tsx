'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/classname';
import { MOBILE_NAV_ITEMS } from '@/configs/nav.config';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/85 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2 pb-safe">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.url ||
            (item.url !== '/' && pathname.startsWith(item.url));
          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] transition-all duration-300',
                isActive
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('size-5', isActive && 'drop-shadow-sm')} />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
