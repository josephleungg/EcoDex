'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function History() {
    const [trashArray, setTrashArray] = useState([]);

    const typeIcons = {
        "Garbage": "/images/bin.png",
        "Recycling": "/images/recycle.png",
        "Green Bin": "/images/compostable.png",
        "Yard Waste": "/images/backyard.png",
        "Battery Disposal": "/images/disposal.png",
    };

    const typeColors = {
        "Garbage": "bg-pastel-red-0",
        "Recycling": "bg-pastel-purple-0",
        "Green Bin": "bg-pastel-green-0",
        "Yard Waste": "bg-pastel-orange-0",
        "Battery Disposal": "bg-pastel-yellow-0",
    };

    useEffect(() => {
        console.log('sup')
    },[]);

    return (
        <div className="px-2 font-roboto">
            <h1 className="font-black text-5xl tracking-wider my-4">EcoDex</h1>
            <div className="flex flex-wrap justify-around mt-10">
            {trashArray.map((trash, index) => {
                const serializedData = encodeURIComponent(JSON.stringify(trash));

                return (
                    <Link key={index} href={`/history/${index}?data=${serializedData}`}>
                    <div className={`${typeColors[trash.type]} rounded-lg drop-shadow-2xl w-48 h-40 mb-4 flex p-4 flex-col`}>
                        <h1 className="text-white font-bold text-xl tracking-wide">{trash.name}</h1>
                        <div className="flex items-center justify-between mt-2">
                        <div className="bg-white p-1 rounded-full opacity-65">
                            <img src={typeIcons[trash.type] || typeIcons["Garbage"]} className="h-10 w-10" />
                        </div>
                        <img src={trash.imageURL} className="h-24 w-24" />
                        </div>
                    </div>
                    </Link>
                );
            })}
            </div>
        </div>
    );
}
