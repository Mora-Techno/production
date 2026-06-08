import { ReactQueryClientProvider } from '@repo/react-query/query-client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@/core/providers/theme.provinder';
import { AlertProvinder } from '@/hooks/useAlert/costum-alert';
import { persistor, store } from '@/stores/store';

import { composeProviders } from './composeProvinder';

const Providers = composeProviders([
  ({ children }) => <Provider store={store}>{children}</Provider>,
  ({ children }) => <PersistGate persistor={persistor}>{children}</PersistGate>,
  ReactQueryClientProvider,
  ThemeProvider,
  AlertProvinder,
]);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
