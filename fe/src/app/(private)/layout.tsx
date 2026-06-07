import PrivateProviders from '@/core/providers/private.provider';
import { AppShell } from '@/core/layouts/app-shell.layout';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateProviders>
      <AppShell>{children}</AppShell>
    </PrivateProviders>
  );
}
