import { useState } from 'react';

export const useBasinSubmit = (endpoint) => {
const [isLoading, setIsLoading] = useState(false);

const submit = async (data) => {
    setIsLoading(true);
    try {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
        formData.append(key, value);
    });

    const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    setIsLoading(false);
    return { success: true };
    } catch (error) {
    setIsLoading(false);
    return { success: false, error: error.message };
    }
};

  return { isLoading, submit };
};