import { useCallback } from 'react';
import { Button, message } from 'antd';
import { Modal } from '@/components';
import { transactionApi, type InputTransaction } from '@/store';
import styles from './style.module.scss';
import { useDisclosure } from '@/hooks';

export const Header = () => {
  const [isModalOpen, { close, open }] = useDisclosure();
  const [createTransaction, { isLoading }] = transactionApi.useCreateMutation();

  const handleOnSubmit = useCallback(
    async (values: InputTransaction) => {
      await createTransaction(values);

      message.success('Transaction created with success');
    },
    [createTransaction]
  );

  return (
    <header className={styles.container}>
      <Button type="primary" color="secondary" onClick={open}>
        New transaction
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={close}
        isLoading={isLoading}
        onSubmit={handleOnSubmit}
      />
    </header>
  );
};
