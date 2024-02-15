import { Button, ButtonTheme } from './Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
	test('test render', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('test theme', () => {
		render(<Button theme={ButtonTheme.BUY}>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveClass('buy');
		screen.debug();
	});

});