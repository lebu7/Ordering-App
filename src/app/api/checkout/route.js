import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    
    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc =await Order.create({
        userEmail, 
        cartProducts, 
        ...address, 
        paid: false,
    });
}