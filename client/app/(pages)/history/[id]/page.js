'use client'; // Ensure this is at the top of the file
import React, { useState, useEffect } from 'react';

export default function HistoryItem({ params }) {
  const { id, name } = params;
  const { itemData, setItemData } = useState({"title":"", "description":"", "typeOfWaste":"", "bioDegradable":"", "decomposeTime":"", "approximateWeight": "", "dimensions": "", "litersOfWaste": "", "image": ""});

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
      <div className="px-2 font-roboto">
        <h1 className="font-black text-5xl tracking-wider my-4">EcoDex</h1>
      </div>
    </div>
  );
}
