import { createServer, Factory, Model, ActiveModelSerializer } from 'miragejs';
import type { Transaction } from '@/store';
import { config } from '@/config';
import { TRANSACTIONS_STORAGE_KEY } from '@/constants';
import { parseJSON } from '@/utils/parse-json';

const getTransactionsFromLocalStorage = () =>
  parseJSON<Array<Transaction>>(
    localStorage.getItem(TRANSACTIONS_STORAGE_KEY)
  ) ?? [];

export const makeServer = () =>
  createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      transaction: Model.extend<Partial<Transaction>>({}),
    },

    factories: {
      transaction: Factory.extend<Transaction>({} as Transaction),
    },

    seeds(server) {
      server.db.loadData({
        transactions: getTransactionsFromLocalStorage(),
      });
    },

    routes() {
      this.urlPrefix = config.baseUrl;
      this.timing = 750;

      this.get('/transactions', () => {
        return this.schema
          .all('transaction')
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
      });

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const newTransaction = schema.create('transaction', data);
        const transactions = getTransactionsFromLocalStorage();

        localStorage.setItem(
          TRANSACTIONS_STORAGE_KEY,
          JSON.stringify([...transactions, newTransaction])
        );

        return newTransaction;
      });

      this.del('/transactions/:id', (schema, request) => {
        const id = request.params.id;
        const deletedTransaction = schema.find('transaction', id)?.destroy();

        const staleTransactionsOnLocalStorage =
          getTransactionsFromLocalStorage();

        localStorage.setItem(
          TRANSACTIONS_STORAGE_KEY,
          JSON.stringify(
            staleTransactionsOnLocalStorage.filter(
              (transaction) => transaction.id !== id
            )
          )
        );

        return deletedTransaction!;
      });

      this.put('/transactions/:id', (schema, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);
        const updatedTransaction = schema.find('transaction', id)?.update(data);

        const staleTransactionsOnLocalStorage =
          getTransactionsFromLocalStorage();

        localStorage.setItem(
          TRANSACTIONS_STORAGE_KEY,
          JSON.stringify(
            staleTransactionsOnLocalStorage.map((transaction) =>
              transaction.id === id ? data : transaction
            )
          )
        );

        return updatedTransaction!;
      });
    },
  });
