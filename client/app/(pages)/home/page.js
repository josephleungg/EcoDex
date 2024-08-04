'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { playSound } from '../../helper/clickSound'

export default function Home() {
    const [headerText, setHeaderText] = useState("");
    const headerSentences = [
        "Proper garbage disposal reduces the risk of disease by preventing the spread of bacteria and viruses.",
        "Recycling can significantly reduce the amount of waste sent to landfills, conserving space and reducing pollution.",
        "Improper disposal of hazardous waste can lead to soil and water contamination, harming wildlife and human health.",
        "Proper waste management reduces greenhouse gas emissions from landfills, helping to mitigate climate change.",
        "Composting organic waste reduces methane emissions and produces nutrient-rich soil for gardening and agriculture.",
        "By separating recyclables, we can recover valuable materials and reduce the need for new raw materials.",
        "Proper garbage disposal helps prevent littering, which can harm wildlife and degrade natural landscapes.",
        "Recycling conserves energy by using less energy to produce new products from recycled materials compared to raw materials.",
        "Proper disposal of electronic waste prevents harmful chemicals from leaching into the environment.",
        "Waste reduction through reusing and recycling can save money for both individuals and municipalities.",
        "Proper waste management can create jobs in the recycling and waste management industries.",
        "Disposing of waste properly can improve community health and safety by reducing vermin and pests.",
        "Proper garbage disposal helps protect marine life by reducing the amount of plastic and other debris that ends up in the oceans.",
        "Reducing waste can save natural resources, such as timber, water, and minerals, by using recycled materials.",
        "Proper waste disposal helps maintain the aesthetic beauty of our surroundings and promotes a cleaner environment.",
        "Efficient waste management systems can reduce the burden on landfills and extend their operational lifespan.",
        "Proper disposal of medical waste prevents the spread of infections and protects public health.",
        "Recycling helps reduce the demand for new raw materials, which can lead to fewer deforestation and mining activities.",
        "Proper garbage disposal practices can lead to more sustainable urban development and cleaner cities.",
        "Educating the public on proper waste disposal can foster a sense of environmental responsibility and community pride."
      ];
      
    const [numberItems, setNumberItems] = useState(0);
    const [numberPoints, setNumberPoints] = useState(0);
    const [numberNextReward, setNumberNextReward] = useState(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * headerSentences.length);
        setHeaderText(headerText + headerSentences[randomIndex]);
        try {
            fetch('http://127.0.0.1:5000/getnumbers')
                .then((response) => response.json())
                .then((data) => {
                    setNumberItems(data.numberFound);
                    setNumberPoints(data.points);
                    setNumberNextReward(data.contributions);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [])
    useEffect(() => {
        // Disable scrolling
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';
    
        // Cleanup on unmount
        return () => {
          document.documentElement.style.overflowY = 'auto';
          document.body.style.overflowY = 'auto';
        };
      }, []);

    return (
        <div className="flex flex-col font-roboto">

            {/* div for header text */}
            <div className="my-12 flex flex-col justify-center items-center px-4">
                <h1 className="text-md text-tertiary-0 font-medium text-center">{headerText}</h1>
            </div>

            {/* div for found items */}
            <div className="flex items-center justify-center bg-white mx-6 mb-16 rounded-lg py-4 font-gameboy border-2 border-black">
                <p className="text-tertiary-0 text-2xl font-black tracking-wider text-center">You've found <span className="text-primary-0">{numberItems} </span> items!</p>
            </div>

        
            {/* button divs */}
            <div className="mb-2">
                {/* div for redeem points */}
                <Link href="/redeem">
                    <div className="flex flex-row rounded-lg items-center justify-around mx-1 px-2 py-4 bg-[#4D5F48] mb-2 active:bg-green-900 transition-colors duration-200" onClick={playSound}>
                        <img 
                            src="/images/eco-coin.png"
                            alt="leaf"
                            className="h-16 w-16"
                        />
                        <div className="flex items-center">
                            <p className="text-white text-3xl font-pocketmonk" style={{letterSpacing: ".4rem"}}>Redeem Points</p>
                        </div>
                    </div>
                </Link>

                {/* div for view ecodex button */}
                <Link href="/history" >
                    <div className="flex flex-row rounded-lg items-center justify-around mx-1 px-2 py-4 bg-secondary-0 active:bg-red-700 transition-colors duration-200" onClick={playSound}>
                        <img 
                            src="/images/book.png"
                            alt="leaf"
                            className="h-16 w-16"
                        />
                        <div className="flex items-center">
                            <p className="text-white text-3xl font-pocketmonk" style={{letterSpacing: ".4rem"}}>View <span className="text-primary-0">Eco</span>Dex</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* div for user stats */}
            <div className="flex flex-row flex-grow p-4 mx-1 space-x-4 rounded-lg bg-[#3D3D33]">
                
                {/* div for number found */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] px-6 py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-bold text-3xl">{numberItems}</p>
                    <p className="text-gray-300 font-medium text-md">Found</p>
                </div>

                {/* div for number of points */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] px-6 py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-bold text-3xl">{numberPoints}</p>
                    <p className="text-gray-300 font-medium text-md">Points</p>
                </div>

                {/* div for number for next reward */}
                <div className="flex flex-col flex-grow justify-center items-center bg-[#8B8B65] py-2 rounded-lg">
                    <p className="text-[#3D3D33] font-bold text-3xl">{numberNextReward}</p>
                    <p className="text-gray-300 font-medium text-md">Contributions</p>
                </div>
            </div>
            
        </div>
    );
}