import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
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

	const handleCurrencyChange = useCallback((value: Currency) => {
		setCurrency(value);
	},[]);
	
	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		setAmount(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<CurrencySelect
				value={currency} 
				onChange={handleCurrencyChange}
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
				<Button theme={ButtonTheme.BUY} type='submit'>BUY</Button>
				<Button theme={ButtonTheme.SELL} type='submit'>SELL</Button>
			</div>
		</form>
	);
};