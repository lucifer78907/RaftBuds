import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthenticated: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-4">User is not authenticated / not allowed</h1>
            <button
                onClick={handleRedirect}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotAuthenticated;