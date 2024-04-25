'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
    const {cartProducts,removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const {phone, streetAddress, city, estate, country} = profileData;
            const addressFromProfile = {
                phone, 
                streetAddress, 
                city, 
                estate, 
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]: value}));
    }
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={"Cart"} />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No items in cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index)=> (
                        <div className="flex items-center gap-4 mb-2 border-b py-4" key={product._id}>
                            <div className="w-14">
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
                    <div className="text-right pr-10 font-semibold">
                        <span className="text-md text-primary">Subtotal:&nbsp;</span>
                        <span className="text-sm text-black">Kes {total}</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg min-h-[50vh] max-h-[50vh]">
                    <h2 className="text-md text-center font-semibold text-primary mb-2">Place your order!</h2>
                    <form>
                        <AddressInputs 
                            addressProps={address}
                            setAddressProps={handleAddressChange}
                        />                
                        <button className="text-sm" type="submit">Checkout (Kes {total})</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
