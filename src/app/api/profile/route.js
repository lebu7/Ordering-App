import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    const update = {};
    if ('name' in data) {
        update.name = data.name;
    }
    if ('image' in data) {
        update.image = data.image;
    }
    if (Object.keys(update).length > 0) {
        // update username
        await User.updateOne({email}, update);
    }

    return Response.json(true);
}