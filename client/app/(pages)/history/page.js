export default function History() {

    const trash1 = {
        name: "Apple Core",
        type: "Green Bin",
        dateCreated: "2024-07-28",
        lifeSpan: "2 weeks",
        description: "The core of an apple, typically discarded after the flesh is eaten.",
        biodegradable: "Yes",
        decomposeTime: "Approximately 2 weeks",
        approximateWeight: "50 grams",
        dimensions: "3 to 4 inches long",
        amountOfWaterToProduce: "70 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash2 = {
        name: "Plastic Bottle",
        type: "Recycling",
        dateCreated: "2024-07-20",
        lifeSpan: "450 years",
        description: "A typical plastic bottle used for beverages.",
        biodegradable: "No",
        decomposeTime: "Approximately 450 years",
        approximateWeight: "50 grams",
        dimensions: "8 to 10 inches tall",
        amountOfWaterToProduce: "3 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash3 = {
        name: "Newspaper",
        type: "Recycling",
        dateCreated: "2024-07-15",
        lifeSpan: "1 year",
        description: "Printed paper used for daily news and information.",
        biodegradable: "Yes",
        decomposeTime: "Approximately 1 year",
        approximateWeight: "200 grams",
        dimensions: "Varies",
        amountOfWaterToProduce: "7 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash4 = {
        name: "Banana Peel",
        type: "Green Bin",
        dateCreated: "2024-07-30",
        lifeSpan: "2 weeks",
        description: "The outer covering of a banana, often discarded after eating.",
        biodegradable: "Yes",
        decomposeTime: "Approximately 2 weeks",
        approximateWeight: "30 grams",
        dimensions: "6 to 8 inches long",
        amountOfWaterToProduce: "560 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash5 = {
        name: "Styrofoam Cup",
        type: "Garbage",
        dateCreated: "2024-07-10",
        lifeSpan: "500 years",
        description: "A cup made from polystyrene foam, often used for hot beverages.",
        biodegradable: "No",
        decomposeTime: "Approximately 500 years",
        approximateWeight: "10 grams",
        dimensions: "3 to 4 inches tall",
        amountOfWaterToProduce: "2 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash6 = {
        name: "Grass Clippings",
        type: "Yard Waste",
        dateCreated: "2024-07-18",
        lifeSpan: "1 month",
        description: "Cut grass left over from mowing the lawn.",
        biodegradable: "Yes",
        decomposeTime: "Approximately 1 month",
        approximateWeight: "300 grams",
        dimensions: "Varies",
        amountOfWaterToProduce: "30 liters",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash7 = {
        name: "Car Battery",
        type: "Battery Disposal",
        dateCreated: "2024-07-05",
        lifeSpan: "100 years",
        description: "A lead-acid battery used to start a car engine.",
        biodegradable: "No",
        decomposeTime: "Approximately 100 years",
        approximateWeight: "10 kg",
        dimensions: "Varies",
        amountOfWaterToProduce: "N/A",
        imageURL: "/images/eco-coin.png"
    };

    const trashArray = [trash1, trash2, trash3, trash4, trash5, trash6, trash7,trash1, trash2, trash3, trash4, trash5, trash6, trash7];
    const typeIcons = {
        "Garbage": "/images/bin.png",
        "Recycling": "/images/recycle.png",
        "Green Bin": "/images/compostable.png",
        "Yard Waste": "/images/backyard.png",
        "Battery Disposal": "/images/disposal.png",
    }

    const colors = ["bg-pastel-purple-0", "bg-pastel-red-0", "bg-pastel-green-0", "bg-pastel-yellow-0", "bg-pastel-orange-0"];

    return (
        <div className="px-2 font-roboto">
            <h1 className="font-black text-5xl tracking-wider my-4">EcoDex</h1>
            <div className="flex flex-wrap justify-around mt-10">
                {trashArray.map((trash, index) => (
                    <div key={index} className={`${colors[index % colors.length]} rounded-lg drop-shadow-2xl w-48 h-40 mb-4 flex p-4 flex-col`}>
                        <h1 className="text-white font-bold text-xl tracking-wide">{trash.name}</h1>
                        <div className="flex items-center justify-between mt-2">
                            <div className="bg-white p-1 rounded-full opacity-65">
                                <img src={typeIcons[trash.type] || typeIcons["Garbage"]} className="h-8 w-8"/>
                            </div>
                            <img src={trash.imageURL} className="h-24 w-24"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
