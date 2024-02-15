import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { ErrorPage } from 'src/pages/ErrorPage';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary
	extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {		
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {

		console.log(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<Suspense fallback="Идет загрузка...">
					<ErrorPage/>
				</Suspense>
			);
		}
		return <>{children}</>;
	}
}

export default ErrorBoundary;
