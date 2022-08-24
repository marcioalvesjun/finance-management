import { useCallback } from 'react';
import { Button, Form, Input, Modal as AntdModal, Select } from 'antd';
import { DatePicker } from '@/components';
import NumberFormat from 'react-number-format';
import { ModalProps } from './types';
import type { InputTransaction } from '@/store';
import dayjs from 'dayjs';
import { fromCurrencyToValue } from '@/utils/format-currency';

const { Option } = Select;

const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
type SubmitValues = Omit<InputTransaction, 'value'> & { value: string };

export function Modal({
  isOpen,
  onClose,
  isLoading = false,
  onSubmit,
  initialValues = {},
}: ModalProps) {
  const handleOnSubmit = useCallback(async (data: SubmitValues) => {
    const normalizedValue =
      typeof data.value === 'number'
        ? data.value
        : fromCurrencyToValue(data.value);

    const normalizedData: InputTransaction = {
      ...data,
      date: dayjs(data.date).toISOString(),
      value: normalizedValue,
    };

    await onSubmit(normalizedData);

    onClose();
  }, []);

  const normalizedInitialValues = initialValues.date
    ? {
        ...initialValues,
        date: dayjs(initialValues.date),
      }
    : {};

  return (
    <AntdModal
      title="Modal"
      visible={isOpen}
      onCancel={onClose}
      footer={[]}
      destroyOnClose
      closable={!isLoading}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={handleOnSubmit}
        initialValues={normalizedInitialValues}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Please select your date!',
            },
          ]}
        >
          <DatePicker format={dateFormatList} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[
            {
              required: true,
              message: 'Please input your value!',
            },
          ]}
        >
          <NumberFormat
            prefix="$ "
            thousandSeparator
            thousandsGroupStyle="thousand"
            decimalScale={2}
            fixedDecimalScale
            customInput={(props: Record<string, unknown>) => (
              <Input {...props} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select your option!' }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="deposit">Deposit</Option>
            <Option value="withdraw">Withdraw</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" ghost onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ marginLeft: '0.5rem' }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AntdModal>
  );
}
