import React, { useState } from 'react';
import PhotoList from './components/PhotoList';
import PhotoUploadForm from './components/PhotoUploadForm';
import LoginForm from './components/LoginForm'; // Import the LoginForm
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [photos, setPhotos] = useState([]); // Centralized photos state

    const handleLoginSuccess = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // Save token in localStorage
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from localStorage
        toast.info('Logged out successfully.');
        setPhotos([]); // Clear photos on logout
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto p-4 bg-white shadow-lg rounded">
                <h1 className="text-3xl font-bold text-center mb-6">Photo Sharing App</h1>
                <ToastContainer />

                {token ? (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none"
                            >
                                Logout
                            </button>
                        </div>
                        {/* Pass token and shared photos state */}
                        <PhotoUploadForm token={token} onUploadSuccess={() => {}} />
                        <PhotoList token={token} photos={photos} setPhotos={setPhotos} />
                    </>
                ) : (
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </div>
    );
};

export default App;
