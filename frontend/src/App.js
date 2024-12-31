import React, { useState, useEffect } from 'react';
import PhotoList from './components/PhotoList';
import PhotoUploadForm from './components/PhotoUploadForm';

const App = () => {
    const [photos, setPhotos] = useState([]);

    // Fetch photos from the server
    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/photos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    // Fetch photos when the component mounts
    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>Photo Sharing App</h1>
            {/* Pass the fetchPhotos function as a callback to refresh the photo list */}
            <PhotoUploadForm onUploadSuccess={fetchPhotos} />
            {/* Pass the photos array to the PhotoList component */}
            <PhotoList photos={photos} />
        </div>
    );
};

export default App;
