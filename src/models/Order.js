const { Schema } = require("mongoose");

const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    streetAddress: String,
    estate: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema)