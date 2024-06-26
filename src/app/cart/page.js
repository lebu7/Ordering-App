'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import ShoppingCart from "@/components/icons/ShoppingCart";
import AddressInputs from "@/components/layout/AddressInputs";
import DeliveryOptions from "@/components/layout/DeliveryOptions";
import SectionHeaders from "@/components/layout/SectionHeaders";
import RegionPopup from "@/components/layout/RegionPopup";
import CartProduct from "@/components/stock/CartProduct";
import PayButton from "@/components/PayButton";
import PayButtonTwo from "@/components/PayButtonTwo";
import MakeOrderButton from "@/components/MakeOrderButton";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TotalDisplay from "@/components/layout/TotalDisplay";

export default function CartPage() {
    const {cartProducts,removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();
    const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showRegionPopup, setShowRegionPopup] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);


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

    useEffect(() => {
        if (cartProducts.length === 0) {
            setSelectedOption(null);
        }
    }, [cartProducts]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        let message = `Selected ${event.target.value}`;
        let fee = 0;
        if (event.target.value === "Door Delivery") {
            fee = 200;
        } else if (event.target.value === "CBD Pickup") {
            fee = 0;
        }
        message += ` + Kes ${fee}`;
        toast.success(message);
    };

    const [deliveryFee, setDeliveryFee] = useState(200);
    const calculateSubtotal = () => {
        let updatedSubtotal = subtotal;
        let adjustedDeliveryFee = deliveryFee;

        if (selectedOption === "CBD Pickup" || !selectedOption) {
            adjustedDeliveryFee = 0;
        }
        return updatedSubtotal + adjustedDeliveryFee;
    };
    const calculateSubtotalWithoutDelivery = () => {
        return subtotal;
    };
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]: value}));
    }

    const handleCheckoutClick = () => {
        setShowRegionPopup(true);
        // setShowDeliveryOptions(true);
      };

      const handleSelectRegion = (region) => {
        setSelectedRegion(region);
        setShowRegionPopup(region === "Nairobi Region");
        setShowDeliveryOptions(region === "Nairobi Region");
        console.log("showDeliveryOptions after selection:", showDeliveryOptions);
        // Conditionally render delivery options or Make Order button
        if (region === "Nairobi Region") {
            setShowDeliveryOptions(true); // Show delivery options for Nairobi Region
        } else {
            if (region === "Outside Nairobi") {
                setShowDeliveryOptions(false);
            } // Hide delivery options for Outside Nairobi
            // Handle "Outside Nairobi" selection (create Make Order button logic here)
        }
      };
    async function proceedToCheckout(ev) {
        ev.preventDefault();

    };
    return (
        <section className="mt-8 mb-1 pb-1">
            <div className="text-center">
                <SectionHeaders mainHeader={"Cart"} />
            </div>
            <div className="mt-8 mx-auto max-w-2xl grid gap-8 grid-cols-2">
                <div className="grow overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)', "scrollbar-width": "thin", "scrollbar-color": "transparent transparent" /* color */, "&::-webkit-scrollbar": "0px solid transparent" /* width */}} >
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
                        <CartProduct 
                        key={product._id}
                        product={product}
                        index={index}
                        removeCartProduct={removeCartProduct} // Pass the removeCartProduct function
                        />
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
                                    {/*selectedOption && (
                                        <div>
                                            <span className="text-sm text-primary">Delivery:&nbsp;</span>
                                            <span className="text-sm text-black">Kes {selectedOption === "Door Delivery" ? 200 : 0}</span><br />
                                        </div>
                                    )*/}
                                    <span className="text-sm text-primary">Total:&nbsp;</span>
                                    <span className="text-sm text-black">Kes {selectedOption === "Door Delivery" ? 200 + subtotal : subtotal}</span>
                                </div>
                        </div>
                                <div className="mb-1">
                                    {selectedRegion === "Outside Nairobi" ? (
                                        <p className="text-xs text-black mt-2">Delivery fees charged by your <span className="text-primary font-semibold">Courier</span> choice.</p>
                                    ) : (
                                        <div>
                                        {!selectedOption ? (
                                            <p className="text-xs text-black ">Delivery fees not included yet.</p>
                                        ) : (
                                            <p className="text-xs text-black mt-1 items-center">
                                                {selectedOption === "Door Delivery" ? (
                                                    <span className="text-black">
                                                        Kes <span className="text-primary font-semibold">{deliveryFee}</span> Included for Door Delivery.
                                                    </span>
                                                ) : selectedOption === "CBD Pickup" ? (
                                                    <span className="text-black">
                                                        No extra fee for CBD Pickups (Kes <span className=" text-primary font-semibold">{deliveryFee - deliveryFee}</span>)
                                                    </span>
                                                ) : null}
                                            </p>
                                        )}
                                        </div>
                                    )}
                                </div>
                    </div>
                </div>
                <div className={`max-w-md bg-gray-100 p-4 rounded-lg 
                    ${cartProducts.length === 0 ? 'min-h-[47vh] max-h-[47vh]' : 
                    (showDeliveryOptions && selectedOption ? 'min-h-[69vh] max-h-[69vh]' : 
                    (showDeliveryOptions ? 'min-h-[62vh] max-h-[62vh]' :   'min-h-[53vh] max-h-[53vh]'))}`}
                >
                    <h2 className="text-md text-center font-semibold text-primary mb-2">Place your order!</h2>
                    <form onSubmit={proceedToCheckout} >
                        <AddressInputs 
                            addressProps={address}
                            setAddressProps={handleAddressChange}
                            className=""
                        />        
                        {cartProducts.length === 0 && (
                            <button 
                                type="button"
                                onClick={() => window.location.href = '/menu'}
                                className="text-xs bg-primary text-white rounded-lg px-5 py-2 w-full"
                            >
                                Add items to cart
                            </button>
                        )}
                        {cartProducts.length > 0 && (
                            <div>
                                {!showDeliveryOptions && !selectedRegion && (
                                    <div className="mt-4">
                                        <button 
                                            type="button"
                                            onClick={() => window.location.href = '/menu'}
                                            className="text-xs bg-white text-black rounded-lg px-5 py-2 w-full mb-1"
                                        >
                                            Continue shopping
                                        </button>
                                        <button 
                                            onClick={handleCheckoutClick}
                                            className="text-xs bg-primary text-white rounded-lg px-5 py-2 w-full"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                )}
                                
                                {/* Conditionally render region popup */}
                                {showRegionPopup && (
                                    <RegionPopup
                                        onClose={() => setShowRegionPopup(false)}
                                        onSelectRegion={handleSelectRegion}
                                    />
                                )}

                                {/* Conditionally render delivery options based on selectedRegion */}
                                {showDeliveryOptions && 
                                    <DeliveryOptions 
                                        subtotalWithoutDelivery={calculateSubtotalWithoutDelivery()}
                                        selectedOption={selectedOption}
                                        deliveryFee={deliveryFee} 
                                        setDeliveryFee={setDeliveryFee}
                                        onOptionChange={handleOptionChange} 
                                    />}
                                {showDeliveryOptions && (
                                    <div className="">
                                        {!selectedOption && (
                                            <button 
                                                type="button"
                                                disabled
                                                className="text-xs bg-primary text-white opacity-50 rounded-lg px-5 py-2 w-full  border-gray-300 cursor-pointer "
                                            >
                                                Select delivery option
                                            </button>
                                        )}
                                        {selectedOption && (
                                            <div className="text-center">
                                              <PayButton
                                                className="text-xs items-center text-center"
                                                total={calculateSubtotal()}
                                                selectedOption={selectedOption}
                                                address={address}
                                              />
                                              <p className="text-xs text-black text-center">or</p>
                                              <MakeOrderButton
                                                className="text-xs items-center text-center"
                                                total={calculateSubtotal()}
                                                selectedOption={selectedOption}
                                                address={address}
                                              />
                                            </div>
                                          )}
                                          
                                    </div>
                                )}
                                {!showDeliveryOptions && selectedRegion === "Outside Nairobi" && (
                                    <div>
                                        <TotalDisplay 
                                            subtotalWithoutDelivery={subtotal}
                                            total={subtotal}
                                        />
                                        <PayButtonTwo address={address} total={calculateSubtotal()} />
                                    </div>
                                  )}
                                  
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
