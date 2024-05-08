'use client';
import { useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const {loading, data:profile} = useProfile();

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
            });
        });
    }, []);
    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8 max-w-2xl mx-auto">
                {orders?.length > 0 && orders.map(order => (
                    <div className="bg-gray-100 rounded-lg py-3 px-4 grid grid-cols-5 gap-2 mb-2 text-xs" key={order._id}>
                        <div>
                            <span className="font-semibold">{order.orderId ? order.orderId : <span className="text-primary">PayOnDelivery</span>}</span>
                        </div>
                
                
                        <div className="px-0">
                            {order?.cartProducts.reduce((total, product) => 
                                product.colours ? total + product.colours.length : total, 0)} Items
                        </div>
                        <div className="text-gray-500 text-center"> 
                            {order.userEmail}
                        </div>
                        <div className="text-center">
                            <span className={
                                (order.paid ? 'bg-green-500' : 'bg-red-400')
                                + ' text-white px-2 py-1 rounded-md text-xs font-semibold'
                            }>
                                {order.paid ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                        <div className="text-right">
                            {new Date(order.date).toLocaleString('en-UK', { timeStyle: 'short', dateStyle: 'short' })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}