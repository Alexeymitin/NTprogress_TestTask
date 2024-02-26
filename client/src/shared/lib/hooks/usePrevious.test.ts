/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

const setUp = () => renderHook(({ state }) => usePrevious(state), { initialProps: { state: 0 } });

describe('usePrevious', () => {
	it('должен возвращать undefined при первом рендере', () => {
		const { result } = setUp();
	
		expect(result.current).toBeUndefined();
	});
	
	it('всегда должен возвращать предыдущее значение', () => {
		const { result, rerender } = setUp();
	
		rerender({ state: 2 });
		expect(result.current).toBe(0);
	
		rerender({ state: 4 });
		expect(result.current).toBe(2);
	
		rerender({ state: 6 });
		expect(result.current).toBe(4);
	});	
});