'use client';
import CartProduct from "@/components/stock/CartProduct";
import {cartProductPrice} from "@/components/AppContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
    const [order, setOrder] = useState();
    const {id} = useParams();
    const [loadingOrder, setLoadingOrder] = useState(true);

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
            {loadingOrder && (
                <div>Loading order...</div>
            )}
        {order && (
            <div className="max-w-xs mx-auto mb-3">  {/* Wrap content in fragment to avoid unnecessary DOM nodes */}
              <div className="text-center border px-3 py-2 rounded-md">
                {order.orderId ? (
                    <span className="font-semibold">{order.orderId}</span>
                ) : (
                    <span className="text-gray-600 font-semibold">PayOnDelivery</span>
                )}
                {/* ... other order details */}
              </div>
            </div>
          )}
          
            {order && (
                <div className="grid grid-cols-2 gap-6 mt-2 ">
                    <div className="grow overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)', "scrollbar-width": "thin", "scrollbar-color": "transparent transparent" /* color */, "&::-webkit-scrollbar": "0px solid transparent" /* width */}}>
                        {order.cartProducts.map(product => (
                            <CartProduct product={product} key={product._id} />
                        ))}
                    </div>
                    <div  className="">
                        {/* New Payment and Delivery Status */}
                        <div className="grid grid-cols-2 gap-1 mb-3 mt-2 ml-2">
                            <div className=" text-xs font-semibold rounded-md">
                                {order?.paid ? (
                                    <span className="bg-green-600 text-white rounded-md px-2 py-1">Paid</span>
                                ) : (
                                    <span className="bg-red-600 text-white rounded-md px-2 py-1">Pending</span>
                                )}
                            </div>
                            <div className="text-xs font-semibold rounded-md">
                                <span
                                    className={`delivery-option 
                                    ${
                                        order?.selectedOption === "Door Delivery"
                                        ? "bg-primary text-white py-1 px-2 rounded-md"
                                        : order?.selectedOption === "Courier Service"
                                        ? "bg-yellow-600 text-white py-1 px-2 rounded-md"
                                        : "bg-green-600 text-white py-1 px-2 rounded-md"
                                    }`}
                                    >
                                {order?.selectedOption}
                            </span>
                            </div>
                        </div>
                        <div className="mb-4 bg-gray-100 rounded-md p-2">
                            {/* User Email and Phone Number */}
                            <div className="grid grid-cols-2 gap-1 mb-1 border rounded-md p-1 mx-auto">
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className="text-xs text-gray-500">Email: </label>
                                    <span className="text-black">{order.userEmail}</span>
                                </div>
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className="text-xs text-gray-500">Phone: </label>
                                    <span className="text-black">{order.phone}</span>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="grid grid-cols-2 gap-1 mb-1 border rounded-md p-1 mx-auto">
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className=" text-xs text-gray-500">Street Address: </label>
                                    <span className="text-black">{order?.streetAddress}</span>
                                </div>
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className=" text-xs text-gray-500">Estate:</label>
                                    <span className="text-black">{order?.estate}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mb-1 border rounded-md p-1 mx-auto">
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className=" text-xs text-gray-500">City: </label>
                                    <span className="text-black">{order?.city}</span>
                                </div>
                                <div className="text-xs grid grid-rows-2 justify-items-start">
                                    <label className=" text-xs text-gray-500">Date: </label>
                                    <span className="text-black">{new Date(order?.date).toLocaleDateString("en-UK", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-b border-l pb-1 pl-2 rounded-lg">
                            <div className="mb-1 text-center">
                                <p className="text-sm text-black text-gray-700 font-semibold">Order Summary</p>
                            </div>
                            <div className="flex mb-1 grid gap-1 grid-cols-2">
                                    <div className="mb-2 mt-1 text-black">
                                        <p className="text-xs ">
                                            Cart items:
                                            <span className="text-gray-500"> ({order?.cartProducts.length})</span>
                                        </p>
                                        <p className="text-xs ">
                                            Total items:
                                            <span className="text-gray-500"> ({order?.cartProducts.reduce((total, product) => 
                                                product.colours ? total + product.colours.length : total, 0)})
                                            </span>
                                        </p>
                                    </div>
                                    <div className=" text-right pr-1 font-semibold">
                                        <span className="text-xs text-primary">Subtotal:&nbsp;</span>
                                        <span className="text-xs text-black">Kes {subtotal}</span><br />
                                        {/*order.selectedOption && (
                                            <div>
                                                <span className="text-xs text-primary">Delivery:&nbsp;</span>
                                                <span className="text-xs text-black">Kes {selectedOption === "Door Delivery" ? 200 : 0}</span><br />
                                            </div>
                                        )*/}
                                        <span className="text-xs text-primary">Total:&nbsp;</span>
                                        <span className="text-xs text-black">
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
                </div>
            )}
        </section>
    );
}