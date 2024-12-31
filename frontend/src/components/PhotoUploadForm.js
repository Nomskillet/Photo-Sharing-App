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
            // Upload photo to backend
            await axios.post('/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Photo uploaded successfully!');
            setTitle(''); // Clear the form fields
            setDescription('');
            setPhoto(null);

            // Call the onUploadSuccess callback to fetch the updated photo list
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="photo">Photo:</label>
                <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                />
            </div>
            <button type="submit">Upload Photo</button>
        </form>
    );
};

export default PhotoUploadForm;

