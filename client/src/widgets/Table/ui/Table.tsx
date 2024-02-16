/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
	useReactTable, 
	ColumnDef, 
	getCoreRowModel, 
	getFilteredRowModel, 
	getPaginationRowModel, 
	getSortedRowModel, 
	createColumnHelper, 
	flexRender, 
	Column,
	Table as ReactTable,
} from '@tanstack/react-table';
import { Request } from '../types/RequestsList';
import { useMemo } from 'react';


import {data} from './fakeData';
import { ws } from 'src/shared/websocket/websocket';


export const Table = () => {

	const columns = useMemo<ColumnDef<Request>[]>(
		() => [
			{
				accessorKey: 'id',
				cell: info => info.getValue(),
				header: 'Id',
				// footer: props => props.column.id,
			},
			{
				accessorKey: 'creation_time',
				cell: info => info.getValue(),
				header: 'Creation Time',
				// footer: props => props.column.id,
			},
			{
				accessorKey: 'change_time',
				cell: info => info.getValue(),
				header: 'Change Time',
				// footer: props => props.column.id,
			}
		],[]);


	const table = useReactTable({
		data, 
		columns, 
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});
	
	return (
		<div className="p-2">
			<div className="h-2" />
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{/* {header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} table={table} />
													</div>
												) : null} */}
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="h-2" />
			<div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{table.getRowModel().rows.length} Rows</div>
			<pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
		</div>
	);
};

// function Filter({
// 	column,
// 	table,
// }: {
// 	column: Column<any, any>
// 	table: ReactTable<any>
//   }) {
// 	const firstValue = table
// 		.getPreFilteredRowModel()
// 		.flatRows[0]?.getValue(column.id);
  
// 	const columnFilterValue = column.getFilterValue();
  
// 	return typeof firstValue === 'number' ? (
// 		<div className="flex space-x-2">
// 			<input
// 				type="number"
// 				value={(columnFilterValue as [number, number])?.[0] ?? ''}
// 				onChange={e =>
// 					column.setFilterValue((old: [number, number]) => [
// 						e.target.value,
// 						old?.[1],
// 					])
// 				}
// 				placeholder={'Min'}
// 				className="w-24 border shadow rounded"
// 			/>
// 			<input
// 				type="number"
// 				value={(columnFilterValue as [number, number])?.[1] ?? ''}
// 				onChange={e =>
// 					column.setFilterValue((old: [number, number]) => [
// 						old?.[0],
// 						e.target.value,
// 					])
// 				}
// 				placeholder={'Max'}
// 				className="w-24 border shadow rounded"
// 			/>
// 		</div>
// 	) : (
// 		<input
// 			type="text"
// 			value={(columnFilterValue ?? '') as string}
// 			onChange={e => column.setFilterValue(e.target.value)}
// 			placeholder={'Search...'}
// 			className="w-36 border shadow rounded"
// 		/>
// 	);
// }