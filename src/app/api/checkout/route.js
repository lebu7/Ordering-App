import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import connection from "@/app/api/checkout/db";
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';


export async function POST(req, res) {
    await connection;

        try {
            const { cartProducts, address, selectedOption, total, reference } = await req.json();

            const session = await getServerSession(authOptions);
            const userEmail = session?.user?.email;
            const date = new Date().getTime();
            const orderId = reference.transaction;

            const orderDoc = await Order.create({
                userEmail,
                ...address,
                selectedOption,
                cartProducts, 
                total,
                orderId,
                paid: orderId ? true : false,
                date,
            });
    // Order created successfully

    // Extract _id and construct dynamic URL
    const { _id } = orderDoc; // Destructure _id
    const successURL = `${process.env.NEXTAUTH_URL}/orders/${_id.toString()}`;

    return NextResponse.json({ 
        message: "Order created successfully!", 
        order: orderDoc,  
        successURL,
    });
    } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
    }
}
