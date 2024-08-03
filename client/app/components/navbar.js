'use client';
import Link from 'next/link'

export default function Navbar() {

  return(
    <div className="flex flex-row fixed bottom-0 w-full bg-white p-2 items-center">
      
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
      <div className="relative flex-grow text-center">
        <Link href="/camera">
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 h-20 w-20 rounded-full bg-primary-0 flex items-center justify-center">
            <img
              src='/images/camera.png'
              alt="Camera"
              className="h-12 w-12"
            />
          </div>
        </Link>
      </div>

      {/* profile button */}
      <div className="flex-grow text-center">
        <Link href="profile">
          <img
            src='/images/profile.png'
            alt="Home"
            className="h-10 w-10 mx-auto"
          />
          <p className="text-sm text-gray-400">Profile</p>
        </Link>
      </div>

    </div>
  );
}