'use client';
import Link from 'next/link';

export default function LaunchPage() {
  return (
    <div className="">
      <Link href="/home">
        Go to Home Page
      </Link>
      <h1 className="font-pocketmonk">Testing Font</h1>
      <h1 className="font-gameboy">Testing Font</h1>
    </div>
  );
}