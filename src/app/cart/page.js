'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage() {
    const {cartProducts,removeCartProduct} = useContext(CartContext);
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={"Cart"} />
            </div>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No items in cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index)=> (
                        <div className="flex items-center gap-4 mb-2 border-b py-2" key={product._id}>
                            <div className="w-24">
                                <Image className="rounded-md" src={product.image} width={150} height={150} alt={product.name} />
                            </div>
                            <div className="grow">
                                <h3 className="text-sm font-semibold line-clamp-1">
                                    {product.name}
                                </h3>
                                {product.size && (
                                    <div className="text-sm text-primary font-semibold">
                                        Size: 
                                        <span className="text-xs text-gray-700 font-normal"> {product.size.name}</span>
                                    </div>
                                )}
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
                            <div className="text-sm font-semibold">
                                Kes {cartProductPrice(product)}
                            </div>
                            <div className="ml-1">
                                <button 
                                    type="button"
                                    onClick={() => removeCartProduct(index)}
                                    className="p-1 rounded-md">
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>right</div>
            </div>
        </section>
    );
}
