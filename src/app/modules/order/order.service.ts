// /services/order.service.js
import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key);

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  await order.save();
  return order;
};

const getOrderHistory = async (email) => {
  return await Order.find({ email }).sort({ date: -1 });
};

const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

const createStripeSession = async (cartItems, shippingDetails, email) => {
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

  console.log(session)

  return session;
};

export const orderService = {
  createOrder,
  getOrderHistory,
  updateOrderStatus,
  createStripeSession,
};
