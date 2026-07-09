import React from 'react';
import ReservationForm from '../book/components/ReservationForm';
import { ToastProvider } from '../book/components/ToastProvider';


const Book = () => {
    return (
        <>
            <ReservationForm />
            <ToastProvider />
            
        </>
    );
};

export default Book;