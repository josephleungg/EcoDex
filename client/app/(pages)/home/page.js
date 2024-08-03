'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [headerText, setHeaderText] = useState("Environmental Fact ");
    const headerSentences = ["recycling is good", "deforestation harms biodiversity", "plastic pollutes oceans", "air pollution kills millions", "climate change raises temperatures","water scarcity affects billions","renewable energy reduces emissions","planting trees combats CO2","overfishing depletes oceans", "sustainable living is the future"];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * headerSentences.length);
        setHeaderText(headerText + headerSentences[randomIndex]);
    }, [])

    return (
        <div className="">

            <div className="pt-4 flex flex-col justify-center items-center">
                <h1 className="text-xs text-tertiary-0 font-roboto font-medium">{headerText}</h1>
            </div>
            
        </div>
    );
}