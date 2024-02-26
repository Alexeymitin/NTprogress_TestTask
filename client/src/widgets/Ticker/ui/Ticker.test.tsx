import { render, fireEvent, waitFor } from '@testing-library/react';
import { Ticker } from './Ticker';
import { screen } from '@testing-library/react';
import { Instrument, OrderSide } from 'src/shared/websocket/model/types/Enums';
import Decimal from 'decimal.js';

describe('Ticker', () => {
	test('renders form with instrument select, amount input, prices and buttons', () => {
		render(<Ticker onSubmit={() => {}} onSubscribe={() => {}} />);
		expect(screen.getByTestId('ticker-form')).toBeInTheDocument();
		expect(screen.getByTestId('ticker-select')).toBeInTheDocument();
		expect(screen.getByTestId('ticker-amount-input')).toBeInTheDocument();
		expect(screen.getAllByTestId('ticker-price')).toHaveLength(2);
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	test('updates amount state when input changes', () => {
		render(<Ticker onSubmit={() => {}} onSubscribe={() => {}} />);
		const amountInput: HTMLInputElement = screen.getByTestId('ticker-amount-input');
		fireEvent.change(amountInput, { target: { value: '100' } });
		expect(amountInput.value).toBe('100');
	});

	test('calls onSubscribe with selected instrument', () => {
		const onSubscribeMock = jest.fn();
		render(<Ticker onSubmit={() => {}} onSubscribe={onSubscribeMock} />);
		const select = screen.getByTestId('ticker-select');
		fireEvent.change(select, { target: { value: '1' } });
		expect(onSubscribeMock).toHaveBeenCalledWith('1');
	});
	// '0', 1, '100', '0';
	test('calls onSubmit with correct parameters when form is submitted', async () => {
		const onSubmitMock = jest.fn();
		const selectedInstrument = 2; 
		render(<Ticker onSubmit={onSubmitMock} onSubscribe={() => {}} />);
		fireEvent.change(screen.getByTestId('ticker-select'), { target: { value: selectedInstrument } });
		fireEvent.change(screen.getByTestId('ticker-amount-input'), { target: { value: new Decimal(100) } });
		fireEvent.click(screen.getByRole('button', { name: /buy/i }));
		await waitFor(() => {
			expect(onSubmitMock).toHaveBeenCalledWith(selectedInstrument.toString(), OrderSide.buy, new Decimal(100), new Decimal(65.77));
		});
	});

	test('updates prices when instrument is selected', () => {
		render(<Ticker onSubmit={() => {}} onSubscribe={() => {}} />);
		const select = screen.getByTestId('ticker-select');
		fireEvent.change(select, { target: { value: '1' } });
		expect(screen.getByText('70.45')).toBeInTheDocument();
		expect(screen.getByText('75.65')).toBeInTheDocument();
	});
});