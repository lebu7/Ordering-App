'use client';
import { useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import ChevronDown from "@/components/icons/ChevronDown";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const {loading, data:profile} = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            });
        });
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8 max-w-xl mx-auto">
                {loadingOrders && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div className="bg-gray-100 rounded-lg py-3 px-4 grid grid-cols-5 gap-2 mb-2 text-xs" key={order._id}>
                        <div>
                            {order.orderId ? (
                                <span className="font-semibold">{order.orderId}</span>
                            ) : (
                                <span className="text-gray-600 font-semibold">PayOnDelivery</span>
                            )}
                        </div>
                        <div className="px-0 text-left">
                            {order?.cartProducts.reduce((total, product) => 
                                product.colours ? total + product.colours.length : total, 0)} Items
                            {order.selectedOption && (
                                <span className="ml-1 text-right border border-black rounded-sm px-1 font-semibold">
                                    {order.selectedOption === 'Courier Service' && (
                                        <span className="text-orange-600">C</span>
                                    )}
                                    {order.selectedOption === 'Door Delivery' && (
                                        <span className="text-primary">D</span>
                                    )}
                                    {order.selectedOption === 'CBD Pickup' && (
                                        <span className="text-green-600">P</span>
                                    )}
                                </span>
                            )}
                            <Link href={`/order-details/${order._id}`} className="flex">
                            <ChevronDown className="w-3 h-3" />
                            </Link>

                        </div>

                        <div className="text-gray-500 text-left"> 
                            {order.userEmail}
                        </div>
                        <div className="text-right">
                            <span className={
                                (order.paid ? 'bg-green-500' : 'bg-red-400')
                                + ' text-white px-2 py-1 rounded-md text-xs font-semibold w-24 text-center'
                            }>
                                {order.paid ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                        <div className="text-right text-xs">
                        {new Date(order?.date).toLocaleDateString("en-UK", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}