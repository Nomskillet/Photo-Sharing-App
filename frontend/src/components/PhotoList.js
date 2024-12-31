import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch photos on component mount
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axiosInstance.get('/photos');
                setPhotos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch photos');
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    // Delete photo with confirmation
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this photo?');
        if (!confirmed) return;

        try {
            await axiosInstance.delete(`/photos/${id}`);
            setPhotos(photos.filter(photo => photo.id !== id)); // Update state to reflect deletion
            alert('Photo deleted successfully!');
        } catch (err) {
            console.error('Failed to delete photo:', err);
            alert('Failed to delete photo.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Photo List</h1>
            <ul>
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <h2>{photo.title}</h2>
                        <p>{photo.description}</p>
                        <img src={photo.imageURL} alt={photo.title} width="200" />
                        <button onClick={() => handleDelete(photo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoList;

