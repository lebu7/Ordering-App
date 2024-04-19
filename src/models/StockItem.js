import { Schema, models, model } from "mongoose";

const StockItemSchema = new Schema({
    image: {type: String},
    name: {type: String,},
    description: {type: String},
    basePrice: {type: Number,},
}, {timestamps: true});

export const StockItem = models?.StockItem || model('StockItem', StockItemSchema)
