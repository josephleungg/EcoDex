export default function History() {

    const trash1 = {
        name: "Apple Core",
        type: "organic",
        dateCreated: "2024-07-28",
        lifeSpan: "2 weeks",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash2 = {
        name: "Plastic Bottle",
        type: "recycling",
        dateCreated: "2024-07-20",
        lifeSpan: "450 years",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash3 = {
        name: "Newspaper",
        type: "recycling",
        dateCreated: "2024-07-15",
        lifeSpan: "1 year",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash4 = {
        name: "Banana Peel",
        type: "organic",
        dateCreated: "2024-07-30",
        lifeSpan: "2 weeks",
        imageURL: "/images/eco-coin.png"
    };
    
    const trash5 = {
        name: "Styrofoam Cup",
        type: "garbage",
        dateCreated: "2024-07-10",
        lifeSpan: "500 years",
        imageURL: "/images/eco-coin.png"
    };
    
    const trashArray = [trash1, trash2, trash3, trash4, trash5];

    return (
        <div className="px-2 font-roboto">
            <h1 className="font-black text-5xl tracking-wider my-4">EcoDex</h1>
            <div className="flex flex-wrap justify-around mt-10">
                {trashArray.map((trash, index) => (
                    <div key={index} className="bg-white rounded-lg drop-shadow-2xl w-44 h-40 mb-4">
                    </div>
                ))}
            </div>
        </div>
    );
}
