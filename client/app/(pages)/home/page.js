'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [headerText, setHeaderText] = useState("Environmental Fact ");
    const headerSentences = ["recycling is good", "deforestation harms biodiversity", "plastic pollutes oceans", "air pollution kills millions", "climate change raises temperatures","water scarcity affects billions","renewable energy reduces emissions","planting trees combats CO2","overfishing depletes oceans", "sustainable living is the future"];
    const [numberItems, setNumberItems] = useState(0);
    const [numberPoints, setNumberPoints] = useState(0);
    const [numberNextReward, setNumberNextReward] = useState(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * headerSentences.length);
        setHeaderText(headerText + headerSentences[randomIndex]);
    }, [])

    return (
        <div className="flex flex-col">

            {/* div for header text */}
            <div className="my-12 flex flex-col justify-center items-center">
                <h1 className="text-sm text-tertiary-0 font-roboto font-medium">{headerText}</h1>
            </div>

            {/* div for found items */}
            <div className="flex items-center justify-center bg-white mx-1 mb-20 rounded-xl">
                <p className="text-tertiary-0 font-roboto text-2xl">You've found <span className="text-primary-0 font-semibold">{numberItems} </span> items!</p>
            </div>

        
            {/* button divs */}
            <div className="mb-2">
                {/* div for redeem points */}
                <Link href="/redeem">
                    <div className="flex flex-row rounded-lg space-x-16 items-center mx-1 p-2 bg-[#4D5F48] mb-2 active:bg-green-900 transition-colors duration-200">
                        <img 
                            src="/images/eco-coin.png"
                            alt="leaf"
                            className="h-16 w-16"
                        />
                        <div className="flex items-center">
                            <p className="text-white text-xl font-roboto font-medium">Redeem Points</p>
                        </div>
                    </div>
                </Link>

                {/* div for view ecodex button */}
                <Link href="/history" >
                    <div className="flex flex-row rounded-lg space-x-16 items-center mx-1 p-2 bg-secondary-0 active:bg-red-700 transition-colors duration-200">
                        <img 
                            src="/images/book.png"
                            alt="leaf"
                            className="h-16 w-16"
                        />
                        <div className="flex items-center">
                            <p className="text-white text-xl font-roboto font-medium">View EcoDex</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* div for user stats */}
            <div className="flex flex-row flex-grow p-4 mx-1 space-x-4 rounded-lg bg-[#3D3D33]">
                
                {/* div for number found */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] px-6 py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-roboto font-bold text-3xl">{numberItems}</p>
                    <p className="text-gray-300 font-roboto font-medium text-md">Found</p>
                </div>

                {/* div for number of points */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] px-6 py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-roboto font-bold text-3xl">{numberPoints}</p>
                    <p className="text-gray-300 font-roboto font-medium text-md">Points</p>
                </div>

                {/* div for number for next reward */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-roboto font-bold text-3xl">{numberNextReward}</p>
                    <p className="text-gray-300 font-roboto font-medium text-md">Next Reward</p>
                </div>
            </div>
            
        </div>
    );
}