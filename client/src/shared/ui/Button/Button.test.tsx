import { Button, ButtonTheme } from './Button';
import { render, screen } from '@testing-library/react';

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

});