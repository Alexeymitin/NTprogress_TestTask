import { Instrument } from '../model/types/Instrument';
import { memo, useCallback } from 'react';
import cls from './InstrumentSelect.module.scss';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Select } from 'src/shared/ui/Select/Select';

interface InstrumentSelectProps {
	className?: string;
	value?: Instrument;
	onChange?: (value: Instrument) => void;
	readonly?: boolean;
}

const options = [
	{value: '', content: 'Выберите инструмент'},
	{value: Instrument.eur_rub, content: Instrument.eur_rub},
	{value: Instrument.eur_usd, content: Instrument.eur_usd},
	{value: Instrument.usd_rub, content: Instrument.usd_rub}
];

export const InstrumentSelect = memo(({className, value, onChange, readonly}: InstrumentSelectProps) => {

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Instrument);
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