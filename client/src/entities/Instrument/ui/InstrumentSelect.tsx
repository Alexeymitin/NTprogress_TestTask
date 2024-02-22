import { memo, useCallback } from 'react';
import cls from './InstrumentSelect.module.scss';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Select } from 'src/shared/ui/Select/Select';
import { Instrument } from 'src/shared/websocket/model/types/Enums';
import { InstrumentImplement } from '../model/types/Instrument';

interface InstrumentSelectProps {
	className?: string;
	value?: Instrument;
	onChange?: (value: Instrument) => void;
	readonly?: boolean;
}

const options = [
	{value: 0, content: 'Выберите инструмент'},
	{value: Instrument.eur_rub, content: InstrumentImplement.eur_rub},
	{value: Instrument.eur_usd, content: InstrumentImplement.eur_usd},
	{value: Instrument.usd_rub, content: InstrumentImplement.usd_rub}
];

export const InstrumentSelect = memo(({className, value, onChange, readonly}: InstrumentSelectProps) => {

	const onChangeHandler = useCallback((value: Instrument) => {
		onChange?.(value as unknown as Instrument);
	},[onChange]);

	return (
		<Select<Instrument> 
			className={classNames(cls.select, {}, [className])}
			options={options}
			value={value}
			onChange={onChangeHandler}
			readonly={readonly}
		/>
	);
});