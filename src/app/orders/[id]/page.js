'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import { Order } from "@/models/Order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Orderpage() {
    const [order, setOrder] = useState();
    const {id} = useParams();
    useEffect(() => {
        if (id) {
            fetch('/api/orders?_id='+ id).then(res => {
                if (res.ok) {
                    return res.json(); // Only attempt to parse JSON if response is OK
                  } else {
                    throw new Error('Failed to fetch order data'); // Throw an error for non-OK responses
                  }
                })
                .then(orderData => {
                  setOrder(orderData);
                })
                .catch(error => {
                  console.error('Error fetching order:', error);
                  // Optionally display an error message to the user
                });
            }
          }, [id]);
    return (
        <section className="mt-8 max-w-2xl mx-auto text-center">
            <div className="text-center">
                <SectionHeaders mainHeader="Your Order" />
                <div className="mt-4">
                    <p>Thanks for your order.</p>
                    <p>We will call you as soon as possible to arrange your delivery.</p>
                </div>
            </div> 
            {order && (
                <div>
                    {JSON.stringify(order)}
                </div>
            )}
        </section>
    );
}