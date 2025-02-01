import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center mt-25">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-orange-500"></div>
        </div>
    );
};

export default LoadingSpinner;