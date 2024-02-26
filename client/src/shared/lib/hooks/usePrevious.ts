/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';

export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		if (value !== ref.current) {
			ref.current = value;
		}
	});
	return ref.current;
};