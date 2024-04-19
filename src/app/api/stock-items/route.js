import {StockItem} from "@/models/StockItem";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const stockItemDoc = await StockItem.create(data);
    return Response.json(stockItemDoc);
}
