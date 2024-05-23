import {StockItem} from "@/models/StockItem";
import mongoose from "mongoose";
import { isAdmin } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    if (await isAdmin()) {
        const stockItemDoc = await StockItem.create(data);
        return Response.json(stockItemDoc);
    } else {
        return Response.json({});
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()) {
        const {_id, ...data} = await req.json();
        await StockItem.findByIdAndUpdate(_id, data);
    }
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
        return Response.json (
            await StockItem.find()
        );
    }

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (isAdmin()) {
        await StockItem.deleteOne({_id});
    }
    return Response.json(true);
}