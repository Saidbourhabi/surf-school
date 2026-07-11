import React from 'react';
import ReservationForm from '../book/components/ReservationForm';
import { ToastProvider } from '../book/components/ToastProvider';
import Stats from './components/Stats';


const Book = () => {
    return (
        <>
            <ReservationForm />
            <Stats />
            <ToastProvider />
            
        </>
    );
};

export default Book;