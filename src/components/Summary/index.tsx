import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
} from 'react-icons/fi';
import { Card, Title } from '@/components';
import { transactionApi, type TransactionType } from '@/store';

import styles from './style.module.scss';

export const Summary = () => {
  const { data } = transactionApi.useListQuery();

  const getSumByType = (type: TransactionType) => {
    if (!data) {
      return 0;
    }

    const transactionsByType = data?.transactions.filter(
      (transaction) => transaction.type === type
    );

    return transactionsByType.reduce((acc, cur) => acc + cur.value, 0);
  };

  const depositTypeSum = getSumByType('deposit');
  const withdrawTypeSum = getSumByType('withdraw');
  const total = depositTypeSum - withdrawTypeSum;

  return (
    <div>
      <Title>Summary</Title>

      <div className={styles.cardsContainer}>
        <Card icon={FiArrowUpCircle} value={depositTypeSum} title="Deposits" />
        <Card
          icon={FiArrowDownCircle}
          value={withdrawTypeSum}
          title="Withdraw"
        />
        <Card icon={FiDollarSign} value={total} title="Total" />
      </div>
    </div>
  );
};
