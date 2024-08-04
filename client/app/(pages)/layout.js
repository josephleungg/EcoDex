'use client';
import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { GlobalContext } from '../../contexts/globalContexts';

export default function RootLayout({ children }) {
  const { isLoading } = useContext(GlobalContext);
  return (
    <html>
      <body>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen min-w-full">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <div>
            <Header />
              <main
                className="min-h-screen bg-[#dbdbdb] py-28"
                style={{
                  backgroundImage: 'url(/images/ecodex-leaf-opacity.png)',
                  backgroundSize: '80% auto',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                {children}
              </main>
            <Navbar />
          </div>
        )}
      </body>
    </html>
  );
}