import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  estate:  String,
  city: String,
  country:String,
  selectedOption: String,
  cartProducts: Object,
  total: Number,
  orderId: String,
  paid: {type: Boolean, default: false},
  date: {type: Date, default: Date.now},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema)