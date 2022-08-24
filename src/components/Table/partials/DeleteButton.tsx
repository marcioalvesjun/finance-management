import { useCallback } from 'react';
import { Popconfirm, Button, message } from 'antd';
import { FiTrash } from 'react-icons/fi';
import { transactionApi, type Transaction } from '@/store';

type DeleteButtonProps = {
  transactionId: Transaction['id'];
};

export const DeleteButton = ({ transactionId }: DeleteButtonProps) => {
  const [deleteTransaction] = transactionApi.useDeleteMutation();

  const handleDeleteTransaction = useCallback(async () => {
    await deleteTransaction(transactionId);
    message.success('Transaction deleted with success');
  }, [deleteTransaction]);

  return (
    <Popconfirm title="Are you sure?" onConfirm={handleDeleteTransaction}>
      <Button icon={<FiTrash />} type="text" danger />
    </Popconfirm>
  );
};
