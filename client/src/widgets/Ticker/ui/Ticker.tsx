import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Instrument, InstrumentSelect } from 'src/entities/Instrument';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import cls from './Ticker.module.scss';
import Decimal from 'decimal.js';
import { OrderSide } from 'src/Enums';
import { ClientMessage } from 'src/entities/Models/ClientMessages';
import { ws } from 'src/shared/websocket/websocket';

export interface PlaceOrder extends ClientMessage {
    instrument: Instrument;
    side: OrderSide;
    amount: Decimal;
    price: Decimal;
}

export enum ClientMessageType {
    subscribeMarketData = 1,
    unsubscribeMarketData,
    placeOrder,
    cancelOrder
}

export interface Message {
	messageType: ClientMessageType;
	message: object;
}

export const Ticker = () => {
	const [instrument, setInstrument] = useState<Instrument>(Instrument.eur_rub);
	const [amount, setAmount] = useState<Decimal>(new Decimal(0.00));
	const [side, setSide] = useState<OrderSide>(OrderSide.buy);
	const [priceBuy, setPriceBuy] = useState<Decimal>(new Decimal(0.00));
	const [priceSell, setPriceSell] = useState<Decimal>(new Decimal(0.00));

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: Message = {
			messageType: ClientMessageType.placeOrder,
			message: {instrument, amount, side, price: side === OrderSide.buy ? priceBuy : priceSell}
		};
		
		ws.send(JSON.stringify(formData));
		console.log(JSON.stringify(formData));
	};

	const handleInstrumentChange = useCallback((value: Instrument) => {
		setInstrument(value);
	},[]);
	
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		setAmount(new Decimal(e.target.value));
	};

	ws.onmessage = function(event) {
		console.log(event.data);
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
				placeholder='Введите сумму' 
				className={cls.inputAmount}
				maxLength={7}
			/>	
			<div>
				<div>85</div>
				<div>86</div>
			</div>
			<div className={cls.buttonWrapper}>
				<Button theme={ButtonTheme.BUY} type='submit' onClick={() => setSide(OrderSide.buy)}>BUY</Button>
				<Button theme={ButtonTheme.SELL} type='submit' onClick={() => setSide(OrderSide.sell)}>SELL</Button>
			</div>
		</form>
	);
};