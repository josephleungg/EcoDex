'use client'; // Ensure this is at the top of the file
import React, { useState, useEffect } from 'react';

export default function HistoryItem({ params }) {
  const { id, name } = params;
  const [itemData, setItemData] = useState({
    title: "title",
    description: "desc",
    typeOfWaste: "tow",
    bioDegradable: "bd",
    decomposeTime: "dt",
    approximateWeight: "aw",
    dimensions: "d",
    litersOfWaste: "low",
    image: "i"
  });

  // fetching the item data once it is mounted
  useEffect(() => {
    console.log('sup')
  }, []);

  // this is how to access this dynamic page
  //  <Link href="/history/1?name=John%20Doe">
  //    <p>User 2</p>
  //  </Link>
  return (
    <div>

      {/* EcoDex title */}
      <div className="px-2 font-roboto">
        <h1 className="font-black text-5xl tracking-wider mb-8">EcoDex</h1>
      </div>

      <div className="flex justify-center items-center">
        <img
          src="/images/ecodex.png"
          alt="leaf"
          className="h-48 w-48 rounded-3xl"
          />
      </div>

      {/* EcoDex item */}
      <div className="flex flex-col rounded-3xl bg-white shadow-md py-10 px-6 mx-2 my-12 font-medium text-sm">

        <div className="h-0.5 bg-gray-300 mb-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Name</p>
          <p className="">{itemData.title}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Description</p>
          <p className="">{itemData.description}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Type of Waste</p>
          <p className="">{itemData.typeOfWaste}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Biodegradable</p>
          <p className="">{itemData.bioDegradable}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Decompose Time</p>
          <p className="">{itemData.decomposeTime}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Approximate Weight</p>
          <p className="">{itemData.approximateWeight}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Dimensions</p>
          <p className="">{itemData.dimensions}</p>
        </div>

        <div className="h-0.5 bg-gray-300 my-3"></div>

        <div className="flex flex-row justify-between">
          <p className="text-gray-400">Liters of Water Used</p>
          <p className="">{itemData.litersOfWaste}</p>
        </div>

        <div className="h-0.5 bg-gray-300 mb-3"></div>

      </div>

    </div>
  );
}
