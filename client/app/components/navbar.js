import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">Logo</div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="mt-2">
          <a href="#" className="block text-white">Home</a>
          <a href="#" className="block text-white">About</a>
          <a href="#" className="block text-white">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;