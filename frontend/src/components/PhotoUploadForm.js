import React, { useState } from 'react';
import axios from '../api/axiosInstance';

const PhotoUploadForm = ({ onUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('photo', photo);

        try {
            await axios.post('/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Photo uploaded successfully!');
            setTitle('');
            setDescription('');
            setPhoto(null);
            onUploadSuccess();
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description:
                </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                    Photo:
                </label>
                <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Upload Photo
            </button>
        </form>
    );
};

export default PhotoUploadForm;

