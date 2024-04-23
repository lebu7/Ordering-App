import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import { useContext } from "react";

export default function StockItem(stockItem) {
    const {
        image, name, description, basePrice, 
        sizes, colours,
    } = stockItem;
    const {addToCart} = useContext(CartContext);
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/35 transition-all">
            <div className="flex text-center justify-center">
                <Image 
                className=" rounded-md hover:scale-105 transition-all"
                src={image} alt={''} width={100} height={100} />
            </div>
            <div className="text-center text-sm font-semibold mt-2">
                {name}
             </div>
             <div className="text-center text-sm max-h-16  pt-1 text-gray-500 line-clamp-2">
                {description}
             </div>
                <button 
                    onClick={() => {addToCart(stockItem)}}
                    className=" flex mt-4 bg-primary text-white rounded-xl px-3 py-2 text-sm">
                    Add to cart {basePrice} Kes
                </button>
            </div>
    );
}