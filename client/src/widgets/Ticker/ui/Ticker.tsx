import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { InstrumentSelect } from 'src/entities/Instrument';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import cls from './Ticker.module.scss';
import Decimal from 'decimal.js';
import { Instrument, OrderSide } from 'src/shared/websocket/model/types/Enums';

const mockPrices: { [key: string]: { buy: Decimal, sell: Decimal } } = {
	0: { buy: new Decimal(0.00), sell: new Decimal(0.00) },
	1: { buy: new Decimal(70.45), sell: new Decimal(75.65) },
	2: { buy: new Decimal(65.77), sell: new Decimal(80.39) },
	3: { buy: new Decimal(65.56), sell: new Decimal(80.73) },
};

interface TickerProps {
	onSubmit: (
		instrument: Instrument, 
		side: OrderSide, 
		amount: Decimal, 
		price: Decimal
	) => void;
	onSubscribe: (instrument: Instrument) => void;
}

export const Ticker = memo(({onSubmit, onSubscribe}: TickerProps) => {
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
		setPriceBuy(mockPrices[value].buy);
		setPriceSell(mockPrices[value].sell);
		if (value > 0) {
			onSubscribe(value);
			setInstrument(value);
		}
	},[onSubscribe]);
	
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		// e.target.value = e.target.value.replace(/[^0-9]/g, '');
		setAmount(new Decimal(e.target.value));
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form} data-testid='ticker-form'>
			<InstrumentSelect
				value={instrument} 
				onChange={handleInstrumentChange}
				data-testid='ticker-select'
			/>
			<input 
				type="text" 
				onChange={handleAmountChange} 
				placeholder='Введите объем заявки' 
				className={cls.inputAmount}
				maxLength={7}
				data-testid='ticker-amount-input'
			/>	
			<div className={cls.priceWrapper}>
				<div className={cls.price} data-testid='ticker-price'>{priceBuy.toFixed(2).toString()}</div>
				<div className={cls.price} data-testid='ticker-price'>{priceSell.toFixed(2).toString()}</div>
			</div>
			<div className={cls.buttonWrapper}>
				<Button theme={ButtonTheme.BUY} type='submit' onClick={() => setSide(OrderSide.buy)}>BUY</Button>
				<Button theme={ButtonTheme.SELL} type='submit' onClick={() => setSide(OrderSide.sell)}>SELL</Button>
			</div>
		</form>
	);
});