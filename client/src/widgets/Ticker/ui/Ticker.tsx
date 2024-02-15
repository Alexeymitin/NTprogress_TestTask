import { ChangeEvent, FormEvent, useState } from 'react';
import { Currency, CurrencySelect } from 'src/entities/Currency';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import cls from './Ticker.module.scss';

interface CurrencyFormData {
	currency: string;
	amount: string;
}

export const Ticker = () => {
	const [currency, setCurrency] = useState<Currency>(Currency.CNH_RUB);
	const [amount, setAmount] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: CurrencyFormData = {currency, amount};
		console.log(formData);
	};

	const handleCurrencyChange = (value: Currency) => {
		setCurrency(value);
	};
	
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<CurrencySelect
				value={currency} 
				onChange={handleCurrencyChange}
			/>
			<div>
				<label htmlFor="amount">Сумма:</label>
				<input type="text" id="amount" onChange={handleAmountChange} placeholder='Введите сумму'/>
			</div>
			<div>
				<label>Цена продажи: 85</label>
			</div>
			<div>
				<label>Цена покупки: 86</label>
			</div>
			<div>
				<Button theme={ButtonTheme.BUY} type='submit'>BUY</Button>
				<Button theme={ButtonTheme.SELL} type='submit'>SELL</Button>
			</div>
		</form>
	);
};