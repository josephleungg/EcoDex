'use client';
import Link from 'next/link';

const Header = () => {

  return (
    <header className="fixed top-0 z-10">
        <div className="bg-primary-0 w-screen h-16">
            <Link href="/">
                <div className="bg-red-600 rounded-full h-8 w-8 absolute top-4 left-8 flex justify-center items-center border-4 border-red-500">
                    <img src="/images/shut-button.png" className="h-4 w-4 opacity-50" />
                </div>
            </Link>
            <Link href="/home">
                <div className="bg-yellow-400 rounded-full h-8 w-8 absolute top-4 left-20 flex justify-center items-center border-4 border-yellow-300">
                    <img src="/images/black-home.png" className="h-4 w-4 opacity-50" />
                </div>
            </Link>
            <Link href="/redeem">
                <div className="bg-green-600 rounded-full h-8 w-8 absolute top-4 left-32 flex justify-center items-center border-4 border-green-500">
                    <img src="/images/eco-coin-black.png" className="h-5 w-5 opacity-50" />
                </div>
            </Link>
            <Link href="/history">
                <div className="h-20 w-20 absolute top-4 right-8 bg-secondary-0 flex justify-center items-center rounded-full border-rose-400 border-4 drop-shadow-2xl">
                    <img
                        src="/images/book.png"
                        alt="EcoDex Icon"
                        className="w-14 h-14"
                    />
                </div>
            </Link>
        </div>
        <div className="flex justify-end">
            <div className="w-0 h-0 border-t-[48px] border-t-primary-0 border-l-[48px] border-l-transparent"></div>
            <div className="bg-primary-0 w-2/5 h-12"></div>
        </div>
        
    </header>
  );
};

export default Header;