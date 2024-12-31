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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
            try {
                await axiosInstance.delete(`/photos/${id}`);
                setPhotos(photos.filter((photo) => photo.id !== id));
                alert('Photo deleted successfully!');
            } catch (error) {
                alert('Failed to delete photo.');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Photo List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="bg-white p-4 shadow rounded-md flex flex-col items-center"
                    >
                        <img
                            src={photo.imageURL}
                            alt={photo.title}
                            className="w-full h-auto rounded mb-4"
                        />
                        <h3 className="text-lg font-semibold">{photo.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{photo.description}</p>
                        <button
                            onClick={() => handleDelete(photo.id)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoList;


