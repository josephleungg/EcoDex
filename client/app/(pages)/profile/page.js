"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Profile() {
    const [date, setDate] = useState(new Date());
    const [userImage, setUserImage] = useState('/images/user.png');
    const [name, setName] = useState('Name');
    const [isEditing, setIsEditing] = useState(false);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNameSubmit = (event) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 bg-white flex items-center justify-center rounded-full drop-shadow-2xl">
                <img src={userImage} className="h-32 w-32 rounded-full object-cover" alt="User" />
                <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                />
            </div>
            <h1 className="m-2 font-roboto font-semibold text-tertiary-0 text-lg">Joined {monthNames[new Date().getMonth()]} {new Date().getFullYear()}</h1>
            <div className="flex items-center justify-between">
                <div className="bg-white w-14 h-10 rounded-lg mr-12 flex items-center justify-around drop-shadow-2xl">
                    <img src="/images/eco-coin.png" className="h-6 w-6" />
                    <h1 className="text-tertiary-0 font-bold text-2xl">0</h1>
                </div>
                <div className="bg-white w-14 h-10 rounded-lg flex items-center justify-around drop-shadow-2xl">
                    <img src="/images/bookmark.png" className="h-5 w-5" />
                    <h1 className="text-tertiary-0 font-bold text-2xl">0</h1>
                </div>
            </div>
            <div className="mt-4 h-12 w-80 px-8 bg-white drop-shadow-2xl flex items-center justify-between rounded-2xl">
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter Name"
                        onChange={handleNameChange}
                        onKeyDown={handleNameSubmit}
                        className="font-medium text-tertiary-0 outline-none w-full bg-transparent"
                        autoFocus
                    />
                ) : (
                    <h1 className="font-medium text-tertiary-0">{name}</h1>
                )}
                <img
                    src="/images/editing.png"
                    className="h-7 cursor-pointer"
                    onClick={handleEditClick}
                />
            </div>

            <div className="mt-4 p-0.5 bg-primary-0 rounded-3xl">
                <Calendar
                    className="rounded-3xl"
                    onChange={setDate}
                    value={date}
                    tileClassName={({ date, view }) => {
                        if (
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth() &&
                            date.getFullYear() === new Date().getFullYear()
                        ) {
                            return 'bg-primary-0 text-white';
                        }
                    }}
                />
            </div>
        </div>
    );
}
