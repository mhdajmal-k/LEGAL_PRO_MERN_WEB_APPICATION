import React, { ReactNode } from "react";


interface ErrorBoundaryProps {
    children: ReactNode;
}


interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }


    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
    }


    handleReload = (): void => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center w-full max-h-full bg-red-600 text-white p-4">
                    <h1>Something went wrong...</h1>
                    <p>We encountered an error. Please try reloading the page.</p>
                    <button
                        onClick={this.handleReload}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
