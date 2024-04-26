export default function AddToCartButton({
    hasSizesOrColours,basePrice,onClick,
}) {
    return (
        <button 
            type="button"
            onClick={onClick}
            className=" flex bg-primary text-white rounded-xl px-3 py-2 text-xs">
            {hasSizesOrColours? (
            <span className="text-xs">Add to cart Kes {basePrice} +</span>
            ) : (
            <span className="text-xs">Add to cart Kes {basePrice}</span>
            )}
        </button>
    );
}