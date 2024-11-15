const LoadingFallback = () => (
    <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        <div className="text-center">
            <p>Loading, please wait...</p>
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mt-4"></div>
        </div>
    </div>
);

export default LoadingFallback;
