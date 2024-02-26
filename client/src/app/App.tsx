import { Suspense } from 'react';
import { MainPage } from 'src/pages/MainPage';

const App = () => {
	return (
		<div data-testid='test-app'>
			<Suspense fallback='Идет загрузка...'>
				<MainPage/>
			</Suspense>			
		</div>
	);
};

export default App;
