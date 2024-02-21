/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';

interface Direction {
	key: string;
	direction: string;
}

export function useSortData<T extends Record<string, any>> (data: T[], config: Direction | null = null) {
	const [sortConfig, setSortConfig] = useState(config);
	
	const sortedItems = useMemo(() => {
		const sortableItems = [...data];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'asc' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'asc' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [data, sortConfig]);

	const requestSort = (key: string) => {
		let direction = 'asc';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'asc'
		) {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};
  
	const requestSortAsc = (key: string) => {
		setSortConfig({ key, direction: 'asc' });
	};
	const requestSortDesc = (key: string) => {
		setSortConfig({ key, direction: 'desc' });
	};
  
	return { items: sortedItems, requestSortAsc, requestSortDesc, requestSort, sortConfig };
}