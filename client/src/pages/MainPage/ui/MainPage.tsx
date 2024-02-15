import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';

const MainPage = () => {
	return (
		<main>
			<Button theme={ButtonTheme.BUY}>BUY</Button>
			<Button theme={ButtonTheme.SELL}>SELL</Button>
		</main>
	);
};

export default MainPage;