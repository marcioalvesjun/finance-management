import { Table as AntdTable, TableColumnProps, Space } from 'antd';
import dayjs from 'dayjs';
import { transactionApi, type Transaction } from '@/store';
import { formatToCurrency, fromCurrencyToValue } from '@/utils/format-currency';
import { EditButton, DeleteButton } from './partials';

type ColumnRecord = Omit<Transaction, 'value'> & {
  value: string;
};

const columns: Array<TableColumnProps<ColumnRecord>> = [
  { title: 'Transaction date', dataIndex: 'date' },
  { title: 'Description', dataIndex: 'description' },
  { title: 'Value', dataIndex: 'value' },
  { title: 'Type', dataIndex: 'type' },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 100,
    render: (_, transaction) => (
      <Space size="middle">
        <DeleteButton transactionId={transaction.id} />
        <EditButton
          transaction={{
            ...transaction,
            value: fromCurrencyToValue(transaction.value),
          }}
        />
      </Space>
    ),
  },
];

export function Table() {
  const { data, isLoading } = transactionApi.useListQuery();

  const dataSource = data?.transactions.map((transaction) => ({
    ...transaction,
    date: dayjs(transaction.date).format('MM/DD/YYYY'),
    value: formatToCurrency(transaction.value),
  }));

  return (
    <AntdTable
      columns={columns}
      loading={isLoading}
      dataSource={dataSource}
      rowKey="id"
    />
  );
}
