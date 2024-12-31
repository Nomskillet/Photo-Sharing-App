import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoList;
