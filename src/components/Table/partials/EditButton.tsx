import { useCallback } from 'react';
import { Button, message } from 'antd';
import { FiEdit } from 'react-icons/fi';
import {
  transactionApi,
  type Transaction,
  type InputTransaction,
} from '@/store';
import { Modal } from '@/components';
import { useDisclosure } from '@/hooks';

type EditButtonProps = {
  transaction: Transaction;
};

export const EditButton = ({ transaction }: EditButtonProps) => {
  const [isModalOpen, { close, open }] = useDisclosure();
  const [updateTransaction, { isLoading }] = transactionApi.useUpdateMutation();

  const handleUpdateTransaction = useCallback(
    async (transactionWithoutId: InputTransaction) => {
      await updateTransaction({ ...transactionWithoutId, id: transaction.id });
      message.success('Transaction edited with success');
    },
    [updateTransaction]
  );

  return (
    <>
      <Button icon={<FiEdit />} type="link" onClick={open} />

      <Modal
        isLoading={isLoading}
        onSubmit={handleUpdateTransaction}
        onClose={close}
        isOpen={isModalOpen}
        initialValues={transaction}
      />
    </>
  );
};
