import type { InputTransaction, Transaction } from '@/store';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (values: InputTransaction) => void | Promise<void>;
  initialValues?: Partial<Transaction>;
};
