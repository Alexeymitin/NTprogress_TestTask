import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './ErrorPage.module.scss';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';


interface ErrorPageProps {
	className?: string;
}

export const ErrorPage = ({className}: ErrorPageProps) => {

	const reloadPage = () => {
		location.reload();
	};
	
	return (
		<div className={classNames(cls.errorPage, {}, [className])}>
			<p>Произошла непредвиденная ошибка, попробуйте обновить страницу</p>
			<Button theme={ButtonTheme.CLEAR} onClick={reloadPage}>
				Обновить страницу
			</Button>
		</div>
	);
};