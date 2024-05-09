'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/stock/CartProduct";
import {cartProductPrice} from "@/components/AppContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
    const [order, setOrder] = useState();
    const [loadinOrder, setLoadingOrder] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        setLoadingOrder(true);
        if (id) {
            fetch('/api/orders?_id='+ id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                });
            })
        }
    }, [id]);

    let subtotal = 0;
    if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
        subtotal += cartProductPrice(product);
    }
}
 function deliveryFee(selectedOption) {
    if (selectedOption === "Door Delivery") {
        return 200;
    } else {
        return 0;
    }
}

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <div className="text-center">
                <SectionHeaders mainHeader="Your Order" />
                <div className="mt-4 mb-6">
                    <p>Thanks for your order.</p>
                    <p>We will call you as soon as possible to arrange your delivery.</p>
                </div>
            </div> 
            {loadingOrder && (
                <div>Loading order...</div>
            )}
            {order && (
                <div className="grid grid-cols-2 gap-16 mt-2">
                    <div className="grow overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)', "scrollbar-width": "thin", "scrollbar-color": "transparent transparent" /* color */, "&::-webkit-scrollbar": "0px solid transparent" /* width */}}>
                        {order.cartProducts.map(product => (
                            <CartProduct product={product} key={product._id} />
                        ))}
                        <div className="border-b pb-1">
                            <div className="mb-1 text-center">
                                <p className="text-md text-black text-gray-700 font-semibold">Order Summary</p>
                            </div>
                            <div className="flex mb-1 grid gap-1 grid-cols-2">
                                    <div className="mb-2 mt-1 text-black">
                                        <p className="text-sm ">
                                            Cart items:
                                            <span className="text-gray-500"> ({order?.cartProducts.length})</span>
                                        </p>
                                        <p className="text-sm ">
                                            Total items:
                                            <span className="text-gray-500"> ({order?.cartProducts.reduce((total, product) => 
                                                product.colours ? total + product.colours.length : total, 0)})
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mb-1 text-right pr-1 font-semibold items-center">
                                        <span className="text-sm text-primary">Subtotal:&nbsp;</span>
                                        <span className="text-sm text-black">Kes {subtotal}</span><br />
                                        {/*order.selectedOption && (
                                            <div>
                                                <span className="text-sm text-primary">Delivery:&nbsp;</span>
                                                <span className="text-sm text-black">Kes {selectedOption === "Door Delivery" ? 200 : 0}</span><br />
                                            </div>
                                        )*/}
                                        <span className="text-sm text-primary">Total:&nbsp;</span>
                                        <span className="text-sm text-black">
                                            Kes{" "}
                                            {order.selectedOption
                                                ? deliveryFee(order.selectedOption) + subtotal
                                                : subtotal}
                                        </span>
                                    </div>
                            </div>
                            <div className="mb-1">
                                <p className="text-xs text-black mt-1 items-center">
                                    {order.selectedOption === "Door Delivery" ? (
                                        <span className="text-black">
                                            Kes <span className="text-primary font-semibold">{deliveryFee("Door Delivery")}</span> Included for Door Delivery.
                                        </span>
                                            ) : order.selectedOption === "CBD Pickup" ? (
                                        <span className="text-black">
                                            No extra fee for CBD Pickups (Kes <span className=" text-primary font-semibold">{deliveryFee("CBD Pickup")}</span>)
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <AddressInputs 
                                disabled={true} 
                                addressProps={order} /> 
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}