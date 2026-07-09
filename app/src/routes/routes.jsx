import { createBrowserRouter } from 'react-router-dom';

// * Layout
import MainLayout from '../layouts/MainLayout';
// * Pages 
import Home from '../pages/home/home';
import Contact from '../pages/contact/contact';
import NotFound from '../pages/NotFound';
import Book from '../pages/book/book';


export const router = createBrowserRouter([
    {
    path: '/',
    element: <MainLayout />, 
    children: [
        // * Main pages
        { index: true, element: <Home /> },
        { path: 'contact', element: <Contact /> },
        { path: 'book', element: <Book /> },
        // * 404 Not found
        { path: '*', element: <NotFound /> },
    ],
    },
]);