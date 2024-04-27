import AddToCartButton from "@/components/stock/AddToCartButton";
import Image from "next/image";

export default function StockItemTile({onAddToCart, ...item}) {
    const {
        image, name, description, basePrice,
        sizes, colours,
    } = item;
    const hasSizesOrColour = sizes?.length > 0 || colours?.length > 0; // TODO: Add options
    return (
        <div 
            className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/35 transition-all" style={{minHeight: '38vh', maxHeight: '38vh'}}>
                <div className="flex text-center justify-center">
                    <Image 
                    className=" rounded-md hover:scale-105 transition-all"
                    src={image} alt={''} width={100} height={100} />
                </div>
                <div className="text-center text-sm font-semibold mt-2 line-clamp-1">
                    {name}
                </div>
                <div className="text-center text-sm max-h-16  mt-2 text-gray-500 line-clamp-2">
                    {description}
                </div>
                <div className="mt-2">
                    <AddToCartButton
                        image={image}
                        hasSizesOrColours={hasSizesOrColour}
                        basePrice={basePrice}
                        onClick={onAddToCart} />
                </div>
        </div>
    );
 }