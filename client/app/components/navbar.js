'use client';
import Link from 'next/link'
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/globalContexts';

export default function Navbar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      setIsLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:5000/uploadImage', {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data);
          window.location.href = `/history/${data.inserted_id}`; // Redirect to the camera page
        } else {
          console.error('File upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  return (
    <div>
      {isLoading ?
        (<div className="flex justify-center items-center min-h-full min-w-full">
          <p className="text-lg">Loading...</p>
        </div>) 
      : 
      (<div className="flex flex-row fixed bottom-0 w-full bg-white p-2 items-center">
      
          {/* home button */}
          <div className="flex-grow text-center">
            <Link href="/home">
              <img
                src='/images/home.png'
                alt="Home"
                className="h-10 w-10 mx-auto"
              />
              <p className="text-sm text-gray-400">Home</p>
            </Link>
          </div>

          {/* camera button */}
          {/* input tag for uploading image */}
          <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
          />

          <div className="relative flex-grow text-center">
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 h-20 w-20 rounded-full bg-primary-0 flex items-center justify-center" onClick={() => {document.getElementById('fileInput').click()}}>
              <img
                src='/images/camera.png'
                alt="Camera"
                className="h-12 w-12"
              />
            </div>
          </div>

          {/* profile button */}
          <div className="flex-grow text-center">
            <Link href="/profile">
              <img
                src='/images/profile.png'
                alt="Profile"
                className="h-10 w-10 mx-auto"
              />
              <p className="text-sm text-gray-400">Profile</p>
            </Link>
          </div>
        </div>
      )}
    </div>
    
    
  );
}