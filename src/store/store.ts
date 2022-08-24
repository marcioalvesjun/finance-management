import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@/config';

export type TransactionType = 'withdraw' | 'deposit';

export type Transaction = {
  id: string;
  date: string;
  value: number;
  description: string;
  type: TransactionType;
};

export type InputTransaction = Omit<Transaction, 'id'>;

const TRANSACTIONS_TYPE = 'Transactions';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  tagTypes: [TRANSACTIONS_TYPE],
  endpoints: (builder) => ({
    list: builder.query<{ transactions: Array<Transaction> }, void>({
      query: () => '/transactions',
      providesTags: [{ type: TRANSACTIONS_TYPE, id: 'LIST' }],
    }),

    create: builder.mutation<Transaction, InputTransaction>({
      query(newTransaction: InputTransaction) {
        return {
          url: `/transactions`,
          method: 'POST',
          body: newTransaction,
        };
      },
      invalidatesTags: [{ type: TRANSACTIONS_TYPE, id: 'LIST' }],
    }),

    update: builder.mutation<Transaction, Transaction>({
      query(transaction) {
        return {
          url: `/transactions/${transaction.id}`,
          method: 'PUT',
          body: transaction,
        };
      },
      invalidatesTags: [{ type: TRANSACTIONS_TYPE, id: 'LIST' }],
    }),

    delete: builder.mutation<Transaction, Transaction['id']>({
      query(transactionId) {
        return {
          url: `/transactions/${transactionId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: TRANSACTIONS_TYPE, id: 'LIST' }],
    }),
  }),
});
