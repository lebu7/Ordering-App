const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  reference: {type: String, required: true, unique: true},
  email: String,
  phone: String,
  firstname:  String,
  lastname: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
  amount: {type: Number, required: true,},
  selectedOption: {type: String, required: true, },
  estate:  String,
  city: String,
  streetAddress: String,
  country:String,
  date: {type: Date, default: Date.now, },
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema)