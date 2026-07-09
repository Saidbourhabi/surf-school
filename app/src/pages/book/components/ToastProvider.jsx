import { Toaster } from "react-hot-toast";

export function ToastProvider() {
return (
        <Toaster
            position="top-right"
            toastOptions={{
            duration: 4000,
            style: {
            background: '#333',
            color: '#fff',
            },
            success: { style: { background: '#065f46' } },
            error: { style: { background: '#991b1b' } },
        }}
    />
);
}