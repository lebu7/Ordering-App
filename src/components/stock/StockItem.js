import { CartContext } from "@/components/AppContext";
import FlyingButton from "react-flying-item";
import Image from "next/image";
import { useContext, useState } from "react";
import StockItemTile from "./StockItemTile";
import toast from "react-hot-toast";
import ShoppingCart from "../icons/ShoppingCart";

export default function StockItem(stockItem) {
    const {
        image, name, description, basePrice, 
        sizes, colours,
    } = stockItem;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedColours, setSelectedColours] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const {addToCart} = useContext(CartContext);
    const [colorSelected, setColorSelected] = useState(false);

    async function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 && colours.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        if (colorSelected) { // Only add to cart if at least one color is selected
            addToCart(stockItem, selectedSize, selectedColours);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowPopup(false);
            toast.success(`${name} added to cart`);
        } else {
            toast.error('Please select at least one color');
        }
    }
    function handleColoursClick(ev, colour) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedColours(prev => [...prev, colour]);
            setColorSelected(true);
        } else {
            setSelectedColours(prev => {
                return prev.filter(c => c.name !== colour.name);
            });
            setColorSelected(false);
        }
    }   

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedColours?.length > 0) {
        for (const colour of selectedColours) {
            selectedPrice += colour.price + basePrice;
        }
        if (selectedPrice) {
            selectedPrice -= basePrice;
        }
    }

    return (
        <>
            {showPopup && (
                <div 
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-fixed bg-black/80 flex items-center justify-center">
                    <div 
                        onClick={(ev) => ev.stopPropagation()}
                        className="my-8 bg-white p-3 rounded-lg mx-auto" style={{minWidth: '400px', maxWidth: '400px'}} >
                        <div 
                            className="overflow-y-scroll" 
                            style={{maxHeight: 'calc(100vh - 200px)'}}>
                            <Image 
                            src={image} 
                            className="mx-auto mb-2 rounded-md hover:scale-105 transition-all" 
                            alt={name} 
                            width={130} height={100} 
                            />
                            <p className="text-lg font-bold text-center text-md mb-3 ms-2">{name}</p>
                            <p className="text-center text-gray-500 text-sm mb-2">
                                {description}
                            </p>
                            {sizes.length > 0 && (
                            <div className= "p-2">
                                <p className="text-sm text-center">Sizes</p>
                                {sizes.map((size) => (
                                    <label className="flex items-center gap-1 p-3 text-xs border rounded-md mb-1" key={size} >
                                        <input 
                                            type="radio" 
                                            onClick={() => setSelectedSize(size)}
                                            checked={selectedSize?.name === size.name}
                                            className="accent-primary" 
                                            name="size" />{size.name} Kes {basePrice + size.price}
                                    </label>
                                ))}
                                </div>
                            )}
                            {colours.length > 0 && (
                            <div className= "p-2">
                                <p className="text-sm text-center">Colours</p>
                                {colours.map((colour) => (
                                    <label className="flex items-center gap-1 p-3 text-xs border rounded-md mb-1" key={colour} >
                                        <input 
                                            type="checkbox"
                                            onClick={ev => handleColoursClick(ev, colour)} 
                                            className="accent-primary" 
                                            name={colour.name} />{colour.name} + Kes {colour.price}
                                    </label>
                                ))}
                            </div>
                            )}
                            <div className="sticky bottom-0">
                                {colorSelected && (
                                    <FlyingButton 
                                        className=""
                                        targetTop={'5%'}
                                        targetLeft={'95%'}
                                        src={image}>
                                        <div
                                            onClick={handleAddToCartButtonClick}
                                            className="primary sticky bottom-2 text-xs"
                                            disabled={!colorSelected}>
                                                <ShoppingCart className="inline-block w-4 h-4" /> {selectedPrice}
                                        </div>
                                    </FlyingButton>
                                )}
                            </div> 
                            <button
                                className="mt-2 text-xs"
                                onClick={() => setShowPopup(false)}>
                                    Cancel
                            </button>
                        </div>
                    </div>
                </div>
                )}
                <StockItemTile 
                    onAddToCart={handleAddToCartButtonClick} 
                    {...stockItem} 
                />
        </>
    );
}