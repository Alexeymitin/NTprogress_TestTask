import { Button, ButtonTheme } from './Button';
import { render, screen, fireEvent  } from '@testing-library/react';

describe('Button', () => {
	test('Проверяем рендер кнопки', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('Проверяем что темы работают', () => {
		render(<Button theme={ButtonTheme.BUY}>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveClass('buy');
		screen.debug();
	});

	test('должен вызывать onClick при клике', () => {
		const onClick = jest.fn();
		const { getByText } = render(<Button onClick={onClick}>TEST</Button>);
		const button = getByText('TEST');
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('должен рендерить кнопку с правильным типом', () => {
		render(<Button type={'submit'}>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveAttribute('type', 'submit');
	});
});