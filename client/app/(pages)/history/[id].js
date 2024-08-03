'use client';
import { useRouter } from 'next/router';

export default function HistoryPage({ history }) {

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-10">{history}</h1>
        </div>
    );
}