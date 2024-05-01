'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import ShoppingCart from "@/components/icons/ShoppingCart";
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

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]: value}));
    }
    async function proceedToCheckout(ev) {
       const response = await fetch('/api/checkout', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               cartProducts,
               address,
           }),
       }) ;
       const link = await response.json()
       window.location = link;
    }
    return (
        <section className="mt-8 mb-1 pb-1">
            <div className="text-center">
                <SectionHeaders mainHeader={"Cart"} />
            </div>
            <div className="mt-8 mx-auto max-w-2xl grid gap-8 grid-cols-2">
                <div className="grow">
                    {cartProducts?.length === 0 && (
                        <div className="text-center border-b">
                            <p className="text-black text-lg font-semibold mt-3">Your cart is empty!</p>
                            <div className="my-6">
                                <div className="flex items-center justify-center mt-4 mb-6">
                                    <ShoppingCart className="w-20 h-20  text-gray-500 "/>
                                    {/*
                                    <span className="absolute top-70 right-105 bg-primary text-white py-1 px-2 rounded-full text-xs leading-3">
                                        {cartProducts.length}
                                    </span>
                                    */}
                                </div>
                            <p className="mt-7 text-sm text-gray-500">Browse our collection</p>
                            <a href="/menu" className="mt-1" style={{display: 'flex', justifyContent: 'center'}} >
                              <button type="button" className="bg-primary text-white px-1 py-2 mx-2 w-24 rounded-md text-xs font-semibold ">
                                Shop now
                              </button>
                            </a>
                            </div>
                        </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index)=> (
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
                                            Size: 
                                            <span className="text-xs text-gray-700 font-normal"> {product.size.name}</span>
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
                                <button 
                                    type="button"
                                    onClick={() => removeCartProduct(index)}
                                    className="p-1 rounded-md">
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="border-b pb-1">
                        <div className="mb-1 text-center">
                            <p className="text-md text-black text-gray-700 font-semibold">Order Summary</p>
                        </div>
                            <div className="flex mb-1 grid gap-1 grid-cols-2">
                                <div className="mb-2 mt-1 text-black">
                                    <p className="text-sm ">
                                        Cart items:
                                        <span className="text-gray-500"> ({cartProducts.length})</span>
                                    </p>
                                    <p className="text-sm ">
                                        Total items:
                                        <span className="text-gray-500"> ({cartProducts.reduce((total, product) => 
                                            product.colours ? total + product.colours.length : total, 0)})
                                        </span>
                                    </p>
                                </div>
                                <div className="mb-1 text-right pr-1 font-semibold items-center">
                                    <span className="text-sm text-primary">Subtotal:&nbsp;</span>
                                    <span className="text-sm text-black">Kes {subtotal}</span><br />
                                    <span className="text-sm text-primary">Delivery:&nbsp;</span>
                                    <span className="text-sm text-black">Kes {200}</span><br />
                                    <span className="text-sm text-primary">Total:&nbsp;</span>
                                    <span className="text-sm text-black">Kes {subtotal + 200}</span>
                                </div>
                        </div>
                            <div className="mb-1">
                                <p className="text-xs text-black ">Delivery fees not included yet.</p>
                            </div>
                    </div>
                </div>
                <div className="max-w-md bg-gray-100 p-4 rounded-lg min-h-[48vh] max-h-[48vh]">
                    <h2 className="text-md text-center font-semibold text-primary mb-2">Place your order!</h2>
                    <form onSubmit={proceedToCheckout} >
                        <AddressInputs 
                            addressProps={address}
                            setAddressProps={handleAddressChange}
                            className=""
                        />                
                        <button className="text-sm" type="submit">Checkout (Kes {subtotal})</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
