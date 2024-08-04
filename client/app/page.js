'use client';
import Link from 'next/link';

export default function LaunchPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#3D3D33]">
      <h1 className="font-pocketmonk text-white text-8xl pb-4">Welcome</h1>
      <img src="/images/ecodex.png" className="h-80 w-auto rounded-2xl mb-6" />
      <Link href="/home">
        <div className="py-12 px-8 bg-green-600 font-gameboy text-white rounded-xl text-2xl font-black drop-shadow-2xl">
          Launch App
        </div>
      </Link>
    </div>
  );
}