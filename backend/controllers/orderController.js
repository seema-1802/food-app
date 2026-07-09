import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order with Stripe

export const placeOrderStripe = async (req, res) => {
  try {
    // const fronted="http://localhost:5173"
    const fronted = process.env.FRONTEND_URL;
    const userId = req.user.id; // from auth token
    const { items, amount, address } = req.body;

  if (amount < 60) {
      return res.status(400).json({
        success: false,
        message: "Minimum order amount is ₹60"
      });
    }



    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create new order in DB
    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
    });
    

    // Clear user's cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: []});

    // Prepare Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    // Optional: Extra service fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Extra Service Fee" },
        unit_amount: 500
      },
      quantity: 1
    });

    // Create Stripe Checkout session
  //   const session = await stripe.checkout.sessions.create({
     
  //     line_items,
  //     mode: "payment",
  //     success_url: `${fronted}/verify?success=true&orderId=${newOrder._id}`,
  //     cancel_url:`${fronted}/verify?success=false&orderId=${newOrder._id}` ,
  //      metadata: {
  //   orderId: newOrder._id.toString()
  // }
  //   });
  const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Food Order"
        },
        unit_amount: amount * 100
      },
      quantity: 1
    }
  ],
  mode: "payment",
  success_url: `${fronted}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${fronted}/verify?success=false&orderId=${newOrder._id}`,
  metadata: {
    orderId: newOrder._id.toString()
  }
});

    res.status(200).json({ success: true, sessionUrl: session.url });

  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ success: false, message: "Stripe payment error" });
  }
};
export const verifyNewOrder = async (req, res) => {
  try {
    const { success, orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID required"
      });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        paymentStatus: true,
        status: "Confirmed"
      });

      return res.json({
        success: true,
        message: "Order Confirmed"
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment Cancelled"
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};
// Get User Orders
export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se milega

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user orders"
    });
  }
};
 export const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({})

    res.json({
      success: true,
      orders: orders
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error fetching orders"
    })
  }
}
// Update Order Status (Admin)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required"
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order: updatedOrder
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating order status"
    });
  }
};
// git remote add origin https://github.com/seema-1802/Food-App-Full.git