import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({product, removeCartProduct, index}) {
    return (
        <div className="flex grow items-center gap-1 mb-2 border-b py-4" key={product._id}>
            <div className="w-14">
                <Image className="rounded-md" src={product.image} width={150} height={150} alt={product.name} />
                    </div>
                        <div className="grow">
                            <h3 className="text-sm font-semibold line-clamp-1">
                                {product.name}
                            </h3>
                            {product.size && (
                                <div className="text-sm text-primary font-semibold">
                                    Size: <span className="text-xs text-gray-700 font-normal"> {product.size.name}</span>
                                </div>
                            )}
                            {/* <div className="text-sm text-primary font-semibold">
                                Quantity:
                                <span className="text-gray-700 text-xs font-normal">{product.colours.length} </span> 
                            </div> */}
                            {product.colours?.length > 0 && (
                                <div className="">
                                    <p className="text-sm text-primary font-semibold">Colours:</p>
                                        {product.colours.map(colour => (
                                            <div className="text-xs text-gray-700" key={colour._id}>
                                                {colour.name} 
                                            </div>
                                        ))}
                                </div>
                                )}
                        </div>
                        <div className="mb-1 flex justify-end">
                            <div className="mt-1 text-sm font-semibold">
                                Kes {cartProductPrice(product)}
                            </div>
                        </div>
                            <div className="mr-0">
                            {removeCartProduct && ( // Conditionally render the button
                                <button
                                type="button"
                                onClick={() => removeCartProduct(index)}
                                className="p-1 rounded-md"
                                >
                                <Trash className="w-4 h-4" />
                                </button>
                          )}
                            </div>
                        </div>
    );
}