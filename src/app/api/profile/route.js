import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import {UserInfo} from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    await User.updateOne({email}, data);

    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({});
    }
    const user = await User.findOne({email});
    const userInfo = await UserInfo.findOne({email});
    return Response.json({...user, ...userInfo});
}