import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import connection from "@/app/api/checkout/db";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
    await connection;

        const { cartProducts, address, selectedOption, total } = await req.json();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;
        const date = new Date();

        const orderDoc = await Order.create({
            userEmail,
            ...address,
            selectedOption,
            cartProducts, 
            total,
            paid: false,
            date,
        });
}
