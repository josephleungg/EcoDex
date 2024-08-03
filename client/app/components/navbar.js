'use client';

export default function Navbar() {
  function handleHomeClick() {
    console.log('home');
  }

  function handleCameraClick() {
    console.log('camera');
  }

  function handleProfileClick() {
    console.log('profile');
  }

  return(
    <div className="flex flex-row fixed bottom-0 w-full bg-white p-2 items-center">
      
      {/* home button */}
      <div className="flex-grow text-center" onClick={handleHomeClick}>
        <img
          src='/images/home.png'
          alt="Home"
          className="h-10 w-10 mx-auto"
        />
        <p className="text-sm text-gray-400">Home</p>
      </div>

      {/* camera button */}
      <div className="relative flex-grow text-center">
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 h-20 w-20 rounded-full bg-primary-0 flex items-center justify-center" onClick={handleCameraClick}>
          <img
            src='/images/camera.png'
            alt="Camera"
            className="h-12 w-12"
          />
        </div>
      </div>

      {/* profile button */}
      <div className="flex-grow text-center" onClick={handleProfileClick}>
        <img
          src='/images/profile.png'
          alt="Home"
          className="h-10 w-10 mx-auto"
        />
        <p className="text-sm text-gray-400">Profile</p>
      </div>

    </div>
  );
}