import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const shippingDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Received", "Cancelled"],
      default: "Pending",
    },
    email: { type: String, required: true },
    shippingDetails: shippingDetailsSchema,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
