import { useCallback, useMemo, useState } from 'react';

export const useDisclosure = (initialState = false) => {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => setOpened(true), [opened]);
  const close = useCallback(() => setOpened(false), [opened]);

  const toggle = useCallback(() => {
    opened ? close() : open();
  }, [open, close, opened]);

  return useMemo(
    () => [opened, { open, close, toggle }] as const,
    [close, open, opened, toggle]
  );
};
