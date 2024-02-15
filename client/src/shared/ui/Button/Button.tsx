import { Mods, classNames } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

export enum ButtonTheme {
	SELL = 'sell',
	BUY = 'buy',
	CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	className?: string;
	theme?: ButtonTheme;
	disabled?: boolean;
	children?: ReactNode;
	onClick?: () => void;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.CLEAR,
		disabled,
		onClick,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.disabled]: disabled,
	};

	return (
		<button 
			type='button'
			className={classNames(cls.button, mods, [className, cls[theme]])}
			disabled={disabled}
			onClick={onClick}
			{...otherProps}
		>
			{children}
		</button>
	);
});