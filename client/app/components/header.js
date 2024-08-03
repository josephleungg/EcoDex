'use client';
import Link from 'next/link';

const Header = () => {

  return (
    <header className="fixed top-0 z-10">
        <div className="bg-primary-0 w-screen h-16">
            <Link href="/history">
                <div className="h-20 w-20 absolute top-4 right-8 bg-secondary-0 flex justify-center items-center rounded-full border-white border-2">
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