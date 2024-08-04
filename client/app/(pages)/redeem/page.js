'use client'; // Ensure this is at the top of the file
import React, { useState, useEffect } from 'react';


const redemptionPrizes = [
 { points: 10, description: "Plant a tree in a reforestation project.", imageURL: "/images/forest.png" },
 { points: 5, description: "Donate $1 to an environmental charity.", imageURL: "/images/charity.png" },
 { points: 15, description: "Adopt a section of a beach for cleanup.", imageURL: "/images/beach-ball.png" },
 { points: 20, description: "Sponsor the cleanup of one pound of ocean plastic.", imageURL: "/images/ocean.png" },
 { points: 8, description: "Provide a reusable water bottle to a community in need.", imageURL: "/images/water-bottle.png" },
 { points: 12, description: "Fund a day's worth of renewable energy for a household.", imageURL: "/images/eco-house.png" },
 { points: 25, description: "Support the installation of a solar panel in a rural area.", imageURL: "/images/energy.png" },
 { points: 30, description: "Help save an endangered species by donating to a wildlife conservation fund.", imageURL: "/images/koala.png" },
 { points: 7, description: "Donate a pack of seeds for a community garden.", imageURL: "/images/gardening.png" },
 { points: 18, description: "Fund the protection of one acre of rainforest.", imageURL: "/images/rainforest.png" }
];


export default function Redeem() {
 const [pointBalance, setPointBalance] = useState(0);
 const [selectedPrize, setSelectedPrize] = useState(null);
 const [showModal, setShowModal] = useState(false);
 const [confirmationMessage, setConfirmationMessage] = useState("");


 useEffect(() => {
   try {
       fetch('http://127.0.0.1:5000/getnumbers')
           .then((response) => response.json())
           .then((data) => {
               setPointBalance(data.points);
           });
   } catch (error) {
       console.error('Error fetching data:', error);
   }
 }, [])


 const handleRedeemClick = (prize) => {
   if (pointBalance < prize.points) {
       setSelectedPrize(prize);
     setConfirmationMessage("Insufficent Funds");
   } else {
     setSelectedPrize(prize);
     setConfirmationMessage(`Redeem for ${prize.points} points?`);
   }
   setShowModal(true);
 };


 const handleConfirm = async () => {
   // console.log(selectedPrize.points)
   setShowModal(false);
   const formData = new FormData();
   formData.append('redeempoints', selectedPrize.pointBalance);
   if (pointBalance >= selectedPrize.points) {
     try{
       const response = await fetch('http://127.0.0.1:5000/redeem', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({points: selectedPrize.points}),
       });
       if (response.ok) {
         const data = await response.json();
         console.log('Prize redeemed successfully:', data);
       } else {
         console.error('Prize redemption failed:', response.statusText);
       }
     } catch (error) {
       console.error('Error redeeming prize:', error);
     }


     setPointBalance(pointBalance - selectedPrize.points);
     setConfirmationMessage("Thank you for your help!");
     setTimeout(() => setShowModal(false), 4000);
   }
 };


 const handleClose = () => {
   setShowModal(false);
   setSelectedPrize(null);
   setConfirmationMessage("");
 };


 return (
   <div className="font-roboto mt-4 px-6">
     <h1 className="font-black text-5xl tracking-wider mb-8 mt-8">Redeem</h1>
     <div className="flex items-center justify-center flex-col">
       <div className="bg-[#3D3D33] px-4 py-2 rounded-xl flex justify-center flex-col items-center fixed z-20 top-32 right-4">
         <div className="flex items-center justify-center">
           <span className="text-[#d0ce5e] text-3xl font-bold mr-3">{pointBalance}</span>
           <img src="/images/eco-coin.png" className="h-8 w-8" />
         </div>
       </div>
       {redemptionPrizes.map((prize, index) => (
         <div key={index} className="bg-white rounded-xl w-96 h-20 mb-3 drop-shadow-2xl flex hover:bg-gray-100" onClick={() => handleRedeemClick(prize)}>
           <div className="basis-1/6 flex justify-center items-center">
             <img src={prize.imageURL} className="h-12 w-12" />
           </div>
           <div className="basis-3/6 flex items-center px-2">
             <div className="text-left text-sm text-tertiary-0 font-medium">{prize.description}</div>
           </div>
           <div className="basis-2/6 flex justify-center items-center">
             <div className="flex flex-col">
               <div className="text-[#d0ce5e] font-black text-4xl flex items-center justify-center">
                 <p>{prize.points}</p>
                 <img src="/images/eco-coin.png" className="ml-2 h-8 w-8" />
               </div>
               <div className="text-gray-300"><span className="text-primary-0">eco</span>dex coins</div>
             </div>
           </div>
         </div>
       ))}
       {showModal && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 font-roboto">
           <div className="bg-gray-200 rounded-xl px-12 py-4">
             <p className=" font-medium text-tertiary-0 mb-6">{confirmationMessage}</p>
             {pointBalance >= selectedPrize?.points && (
               <div className="flex justify-around mt-6">
                 <button className="bg-pastel-red-0 text-white px-4 py-2 rounded" onClick={handleClose}>No</button>
                 <button className="bg-pastel-green-0 text-white px-4 py-2 rounded" onClick={handleConfirm}>Yes</button>
               </div>
             )}
             {pointBalance < selectedPrize?.points && (
               <div className="flex justify-center">
                 <button className="bg-pastel-purple-0 text-white px-4 py-2 rounded" onClick={handleClose}>Okay</button>
               </div>
             )}
           </div>
         </div>
       )}
     </div>
   </div>
 );
}
