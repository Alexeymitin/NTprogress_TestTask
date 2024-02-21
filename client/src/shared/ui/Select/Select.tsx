
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { ChangeEvent, useMemo } from 'react';

export interface SelectOption<T extends string> {
	value: T;
	content: string;
	disabled?: boolean;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOption<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const {
		className,
		label,
		options,
		value,
		readonly,
		onChange
	} = props;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T);
	};

	const optionsList = useMemo(() => options?.map((opt) => (
		<option
			className={cls.option}
			value={opt.value}
			key={opt.value}
			disabled={opt.disabled}
		>
			{opt.content}
		</option>
	)),[options]);

	return (
		<div className={classNames(cls.wrapper, {}, [className])}>
			{label && (
				<span className={cls.label}>
					{`${label}>`}
				</span>
			)}
			<select
				disabled={readonly}
				className={cls.select}
				value={value}
				onChange={onChangeHandler}
			>
				{optionsList}
			</select>
		</div>
	);
};