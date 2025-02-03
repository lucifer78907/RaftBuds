import { useState, useEffect } from 'react';

function useLocalStorage() {
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const id = localStorage.getItem('userData');
        if (id)
            setUserId(id);
    }, [])

    return {
        userId,
        setUserId
    }
}

export default useLocalStorage;