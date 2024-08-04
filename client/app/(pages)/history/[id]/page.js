'use client'; // Ensure this is at the top of the file
import React, { useState, useEffect } from 'react';

export default function HistoryItem({ params }) {
  const { id } = params;
  const [itemData, setItemData] = useState({});
  const [typeColor, setTypeColor] = useState("bg-white text-black");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        
        // Strip trailing spaces from string values
        const cleanedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => 
            [key, typeof value === 'string' ? value.trim() : value]
          )
        );

        if(cleanedData["Type of Waste"] === "Garbage"){
          setTypeColor("bg-gray-900 text-white");
        }else if(cleanedData["Type of Waste"] === "Recycling"){
          setTypeColor("bg-blue-500 text-white");
        }else if(cleanedData["Type of Waste"] === "Green Bin"){
          setTypeColor("bg-green-500 text-white");
        }else if(cleanedData["Type of Waste"] === "Yard Waste"){
          setTypeColor("bg-yellow-500 text-white");
        }else if(cleanedData["Type of Waste"] === "Battery Disposal"){
          setTypeColor("bg-red-500 text-white");
        }

        setItemData(cleanedData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mb-16">

      {/* EcoDex title */}
      <div className="px-2 font-roboto">
        <h1 className="font-black text-5xl tracking-wider mb-8">EcoDex</h1>
      </div>

      <div className="flex justify-center items-center my-2 drop-shadow-2xl">
        <img
          src={itemData["image"]}
          alt="leaf"
          className="h-60 w-60 rounded-3xl object-cover"
        />
      </div>

      {/* EcoDex item */}
      <div className="flex flex-col rounded-3xl bg-white shadow-md py-10 px-6 mx-2 font-medium text-md font-roboto">

        <div className="flex flex-row pb-3 justify-between">
          <p className="text-gray-400">Name</p>
          <p className="font-normal text-tertiary-0">{itemData["Title"]}</p>
        </div>
        <hr />

        <div className="flex flex-row py-3 justify-between flex-wrap">
          <p className="text-gray-400 flex-1 basis-1/3">Description</p>
          <p className="flex-1 break-words whitespace-normal text-right font-normal text-tertiary-0 basis-2/3">{itemData["Description"]}</p>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between">
          <p className="text-gray-400 basis-1/3">Type of Waste</p>
          <div className={`${typeColor} rounded-lg p-2 font-gameboy text-xs shadow-md`}>
            <p className=" font-normal text-white basis-2/3">{itemData["Type of Waste"]}</p>
          </div>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between">
          <p className="text-gray-400 basis-1/3">Biodegradable</p>
          <p className=" font-normal text-tertiary-0 basis-2/3 text-right">{itemData["Biodegradable"]}</p>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between flex-wrap">
          <p className="text-gray-400 flex-1 basis-1/3">Decompose</p>
          <p className="flex-1 break-words whitespace-normal text-right font-normal text-tertiary-0 basis-2/3">{itemData["Decompose Time"]}</p>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between flex-wrap">
          <p className="text-gray-400 flex-1 basis-1/3">Weight</p>
          <p className="flex-1 break-words whitespace-normal text-right font-normal text-tertiary-0 basis-2/3">{itemData["Approximate Weight"]}</p>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between flex-wrap">
          <p className="text-gray-400 flex-1 basis-1/3">Dimensions</p>
          <p className="flex-1 break-words whitespace-normal text-right font-normal text-tertiary-0 basis-2/3">{itemData["Dimensions"]}</p>
        </div>

        <hr />

        <div className="flex flex-row py-3 justify-between flex-wrap">
          <p className="text-gray-400 flex-1 basis-1/3">Water Used (L)</p>
          <p className="flex-1 break-words whitespace-normal text-right font-normal text-tertiary-0 basis-2/3">{itemData["Amount of Liters of Water to Produce"]}</p>
        </div>

        <hr />

      </div>

    </div>
  );
}
