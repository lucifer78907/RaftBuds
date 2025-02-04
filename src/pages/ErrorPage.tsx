import React from 'react';
import { useNavigate } from 'react-router-dom';

// In case of any error , this route is triggered
const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-xl text-gray-700 mb-8">Something went wrong. Please try again later.</p>
            <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default ErrorPage;