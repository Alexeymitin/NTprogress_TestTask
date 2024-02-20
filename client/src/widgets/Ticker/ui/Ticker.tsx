import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Instrument, InstrumentSelect } from 'src/entities/Instrument';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import cls from './Ticker.module.scss';
import Decimal from 'decimal.js';
import { ClientMessageType, OrderSide, ServerMessageType } from 'src/shared/websocket/model/types/Enums';
import WSConnector from 'src/shared/websocket/WSClient';
import { ServerEnvelope } from 'src/shared/websocket/model/types/ServerMessages';
import { ClientEnvelope } from 'src/shared/websocket/model/types/ClientMessages';

interface TickerProps {
	saveData: (message: ServerEnvelope) => void;
}

export const Ticker = ({saveData}: TickerProps) => {
	const [instrument, setInstrument] = useState<Instrument>(Instrument.eur_rub);
	const [amount, setAmount] = useState<Decimal>(new Decimal(0.00));
	const [side, setSide] = useState<OrderSide>(OrderSide.buy);
	const [priceBuy, setPriceBuy] = useState<Decimal>(new Decimal(50));
	const [priceSell, setPriceSell] = useState<Decimal>(new Decimal(60));


	const ws = useMemo(() => new WSConnector(), []);


	useEffect(() => {
		ws.connect();
	
		// return () => {
		// 	ws.disconnect();
		// };
		// console.log(ws.orderR);
	}, [ws]);
	

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: ClientEnvelope = {
			messageType: ClientMessageType.placeOrder,
			message: {instrument, amount, side, price: side === OrderSide.buy ? priceBuy : priceSell}
		};

		const price = side === OrderSide.buy ? priceBuy : priceSell; 
		
		ws.placeOrder(instrument, side, amount, price);
		if (formData.message) {
			saveData((formData.message as ServerEnvelope));
		}	
	};

	const handleInstrumentChange = useCallback((value: Instrument) => {
		setInstrument(value);
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