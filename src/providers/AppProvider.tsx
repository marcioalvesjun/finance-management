import { transactionApi } from '@/store';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <ApiProvider api={transactionApi}>{children}</ApiProvider>;
};
