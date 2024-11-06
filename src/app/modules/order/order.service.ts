import Stripe from "stripe";
import config from "../../config";
import { Order } from "./order.model";

const stripe = new Stripe(config.stripe_secret_key as string); // Ensure the key is a string

// Define types for order data and parameters
interface OrderData {
  shippingDetails: Record<string, any>; // Adjust type based on the shape of shippingDetails
  cartItems: Array<{ name: string; imageUrl: string; price: number; quantity: number }>;
  totalAmount: number;
  email: string;
}

interface User {
  role: "ADMIN" | "USER";
  email: string;
}

interface StripeSessionData {
  cartItems: Array<{ name: string; imageUrl: string; price: number; quantity: number }>;
  shippingDetails: Record<string, any>; // Adjust type
  email: string;
}

const createOrder = async ({ shippingDetails, cartItems, totalAmount, email }: OrderData) => {
  const order = new Order({
    shippingDetails,
    items: cartItems,
    total: totalAmount,
    email,
  });
  await order.save();
  return order;
};

const getOrderHistory = async (user: User) => {
  if (user.role === "ADMIN") {
    return await Order.find().sort({ date: -1 });
  }
  return await Order.find({ email: user.email }).sort({ date: -1 });
};

const updateOrderStatus = async (orderId: string, status: string) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

const createStripeSession = async ({
  cartItems,
  shippingDetails,
  email,
}: StripeSessionData) => {
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.imageUrl],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: lineItems,
    mode: "payment",
    metadata: {
      orderId: `${new Date().getTime()}`,
    },
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  return session;
};

export const orderService = {
  createOrder,
  getOrderHistory,
  updateOrderStatus,
  createStripeSession,
};
