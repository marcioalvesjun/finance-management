import { Table, Title, Summary, Header } from '@/components';
import styles from './style.module.scss';

export function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <Summary />

      <main>
        <Title>Transactions</Title>
        <Table />
      </main>
    </div>
  );
}
