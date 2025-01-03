import React, { useState } from "react";
import PhotoList from "./components/PhotoList";
import PhotoUploadForm from "./components/PhotoUploadForm";
import LoginForm from "./components/LoginForm";
import RegistrationForm from './components/RegistrationForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [photos, setPhotos] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Registration

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    toast.info("Logged out successfully.");
    setPhotos([]);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
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
            <PhotoUploadForm
              token={token}
              onUploadSuccess={(newPhoto) => {
                setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
              }}
            />
            <PhotoList token={token} photos={photos} setPhotos={setPhotos} />
          </>
        ) : isRegistering ? (
          <>
            <RegistrationForm onRegisterSuccess={toggleForm} />
            <div className="text-center mt-4">
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Already have an account? Login here
              </button>
            </div>
          </>
        ) : (
          <>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <div className="text-center mt-4">
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Don't have an account? Register here
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
