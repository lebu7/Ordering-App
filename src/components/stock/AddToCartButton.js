import FlyingButton from 'react-flying-item';
import ShoppingCart from '../icons/ShoppingCart';
export default function AddToCartButton({
    hasSizesOrColours, basePrice, onClick, image,
}) {
    if (!hasSizesOrColours) {
        return (
            <div className='flying-button-parent mt-4'>
                <FlyingButton 
                    targetTop={'5%'}
                    targetLeft={'95%'}
                    src={image}>
                        <div onClick={onClick} className=" flex text-center font-semibold text-sm">
                            <ShoppingCart className="font-semibold w-5 h-5"/>&nbsp;{basePrice}
                        </div>
                </FlyingButton>
            </div>
        );
    }
    return (
        <button 
            type="button"
            onClick={onClick}
            className=" flex bg-primary text-white rounded-xl px-3 py-2 text-sm text-center"
            >
            <ShoppingCart className="font-semibold w-5 h-5"/>&nbsp;{basePrice}&nbsp;+
        </button>
    );
}