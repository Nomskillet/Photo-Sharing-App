import React, { useState } from 'react';
import PhotoList from './components/PhotoList';
import PhotoUploadForm from './components/PhotoUploadForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const [photos, setPhotos] = useState([]);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/photos');
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    React.useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto p-4 bg-white shadow-lg rounded">
                <h1 className="text-3xl font-bold text-center mb-6">Photo Sharing App</h1>
                <PhotoUploadForm onUploadSuccess={fetchPhotos} />
                <PhotoList photos={photos} />
                <ToastContainer />
            </div>
        </div>
    );
};

export default App;

