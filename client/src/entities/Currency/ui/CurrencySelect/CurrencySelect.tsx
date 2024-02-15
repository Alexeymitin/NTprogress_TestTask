import { Currency } from '../../model/types/Currency';
import { memo, useCallback } from 'react';
import cls from './CurrencySelect.module.scss';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Select } from 'src/shared/ui/Select/Select';

interface CurrencySelectProps {
	className?: string;
	value?: Currency;
	onChange?: (value: Currency) => void;
	readonly?: boolean;
}

const options = [
	{value: Currency.CNH_RUB, content: Currency.CNH_RUB},
	{value: Currency.EUR_RUB, content: Currency.EUR_RUB},
	{value: Currency.EUR_USD, content: Currency.EUR_USD}
];

export const CurrencySelect = memo(({className, value, onChange, readonly}: CurrencySelectProps) => {

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency);
	},[onChange]);

	return (
		<Select 
			className={classNames(cls.select, {}, [className])}
			options={options}
			value={value}
			onChange={onChangeHandler}
			readonly={readonly}
		/>
	);
});