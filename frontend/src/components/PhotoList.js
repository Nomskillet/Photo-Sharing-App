import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

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
        try {
            await axiosInstance.delete(`/photos/${id}`);
            setPhotos(photos.filter((photo) => photo.id !== id));
            toast.success('Photo deleted successfully!');
        } catch (err) {
            console.error('Error deleting photo:', err);
            toast.error('Failed to delete photo.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Photo List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="p-4 border rounded shadow-sm">
                        <img src={photo.imageURL} alt={photo.title} className="w-full h-auto mb-2" />
                        <h2 className="text-lg font-semibold">{photo.title}</h2>
                        <p className="text-sm text-gray-500">{photo.description}</p>
                        <button
                            onClick={() => handleDelete(photo.id)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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


