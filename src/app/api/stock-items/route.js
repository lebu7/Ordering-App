import {StockItem} from "@/models/StockItem";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const stockItemDoc = await StockItem.create(data);
    return Response.json(stockItemDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, ...data} = await req.json();
    await StockItem.updateOne({_id}, data);
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json (
        await StockItem.find()
    );
}