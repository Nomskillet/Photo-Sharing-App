import React, { useState } from 'react';
import axios from '../api/axiosInstance'; // Adjust path as needed
import { toast } from 'react-toastify';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/auth/login', { username, password });
            const { token } = response.data;

            // Notify the parent component about successful login
            onLoginSuccess(token);

            // Show success toast
            toast.success('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 shadow-md rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
