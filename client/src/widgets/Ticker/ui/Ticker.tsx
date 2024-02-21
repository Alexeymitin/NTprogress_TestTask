import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Instrument, InstrumentSelect } from 'src/entities/Instrument';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import cls from './Ticker.module.scss';
import Decimal from 'decimal.js';
import { OrderSide } from 'src/shared/websocket/model/types/Enums';

const mockPrices: { [key: string]: { buy: Decimal, sell: Decimal } } = {
	'EUR/USD': { buy: new Decimal(70.45), sell: new Decimal(75.65) },
	'EUR/RUB': { buy: new Decimal(65.77), sell: new Decimal(80.39) },
	'USD/RUB': { buy: new Decimal(65.56), sell: new Decimal(80.73) },
};

interface TickerProps {
	onSubmit: (
		instrument: Instrument, 
		side: OrderSide, 
		amount: Decimal, 
		price: Decimal
	) => void;
}

export const Ticker = ({onSubmit}: TickerProps) => {
	const [instrument, setInstrument] = useState<Instrument>();
	const [amount, setAmount] = useState<Decimal>(new Decimal(0.00));
	const [side, setSide] = useState<OrderSide>(OrderSide.buy);
	const [priceBuy, setPriceBuy] = useState<Decimal>(new Decimal(0));
	const [priceSell, setPriceSell] = useState<Decimal>(new Decimal(0));

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const price = side === OrderSide.buy ? priceBuy : priceSell; 	
		if (instrument) {
			onSubmit(instrument, side, amount, price);
		}
	};

	const handleInstrumentChange = useCallback((value: Instrument) => {
		setInstrument(value);
		setPriceBuy(mockPrices[value].buy);
		setPriceSell(mockPrices[value].sell);
	},[]);
	
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		// e.target.value = e.target.value.replace(/[^0-9]/g, '');
		setAmount(new Decimal(e.target.value));
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<InstrumentSelect
				value={instrument} 
				onChange={handleInstrumentChange}
			/>
			<input 
				type="text" 
				onChange={handleAmountChange} 
				placeholder='Введите объем заявки' 
				className={cls.inputAmount}
				maxLength={7}
			/>	
			<div className={cls.priceWrapper}>
				<div className={cls.price}>{priceBuy.toFixed(2).toString()}</div>
				<div className={cls.price}>{priceSell.toFixed(2).toString()}</div>
			</div>
			<div className={cls.buttonWrapper}>
				<Button theme={ButtonTheme.BUY} type='submit' onClick={() => setSide(OrderSide.buy)}>BUY</Button>
				<Button theme={ButtonTheme.SELL} type='submit' onClick={() => setSide(OrderSide.sell)}>SELL</Button>
			</div>
		</form>
	);
};