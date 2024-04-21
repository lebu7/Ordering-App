import mongoose, { Schema, models, model } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: {type: String},
    price: {type: Number},
}, {timestamps: true});

const StockItemSchema = new Schema({
    image: {type: String},
    name: {type: String,},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number,},
    sizes: {type: [ExtraPriceSchema]},
    colours: {type: [ExtraPriceSchema] },
}, {timestamps: true});

export const StockItem = models?.StockItem || model('StockItem', StockItemSchema)
