import { renderHook, act } from '@testing-library/react';

import { useDisclosure } from '.';

describe('useDisclosure', () => {
  it('should handle close correctly', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].close());
    expect(result.current[0]).toBe(false);
  });

  it('should handle open correctly', () => {
    const { result } = renderHook(() => useDisclosure(false));
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].open());
    expect(result.current[0]).toBe(true);
  });

  it('should handle toggle correctly', () => {
    const { result } = renderHook(() => useDisclosure(false));
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });
});
