import { Card as AntdCard, Typography } from 'antd';
import { formatToCurrency } from '@/utils/format-currency';
import { CardProps } from './types';
import styles from './styles.module.scss';

const { Text, Title: AntdTitle } = Typography;

export function Card({ icon: Icon, title, value }: CardProps) {
  const formattedValue = formatToCurrency(value);

  return (
    <AntdCard
      className={styles.card}
      bodyStyle={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.75rem 3.5rem 0.5rem 0.75rem',
      }}
    >
      <div className={styles.cardIcon}>
        <Icon />
      </div>

      <div className={styles.cardText}>
        <AntdTitle level={2}>{title}</AntdTitle>
        <Text>{formattedValue}</Text>
      </div>
    </AntdCard>
  );
}
