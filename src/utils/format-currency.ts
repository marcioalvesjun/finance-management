export const formatToCurrency = (value: number | string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value));

export const fromCurrencyToValue = (value: string) =>
  Number(value.replace(/[^0-9.-]+/g, ''));
