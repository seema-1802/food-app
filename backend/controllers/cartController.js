import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🛑 Fix: If cartData is array, convert to object
    let cartData = user.cartData;

    if (!cartData || Array.isArray(cartData)) {
      cartData = {};
    }

    if (!cartData[productId]) {
      cartData[productId] = 1;
    } else {
      cartData[productId] += 1;
    }

    user.cartData = cartData;
    user.markModified("cartData");

    await user.save();

    res.status(200).json({
      success: true,
      cartData: user.cartData
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = user.cartData;

    let cartItems = [];

    for (const productId in cartData) {
      const product = await foodModel.findById(productId);

      if (product) {
        cartItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: cartData[productId],
          totalPrice: product.price * cartData[productId]
        });
      }
    }

    res.status(200).json({
      success: true,
      cart: cartItems
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (!cartData[productId]) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    //  If quantity > 1 → decrease
    if (cartData[productId] > 1) {
      cartData[productId] -= 1;
    } 
    //  If quantity = 1 → remove completely
    else {
      delete cartData[productId];
    }

    user.cartData = cartData;
    user.markModified("cartData");

    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartData: user.cartData
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// export const getCart = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let cartData = user.cartData;

//     if (!cartData || Array.isArray(cartData)) {
//       return res.status(200).json({
//         success: true,
//         cart: []
//       });
//     }

//     const productIds = Object.keys(cartData);

//     const products = await foodModel.find({
//       _id: { $in: productIds }
//     });

//     const cartItems = products.map(product => ({
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: cartData[product._id],
//       totalPrice: product.price * cartData[product._id]
//     }));

//     res.status(200).json({
//       success: true,
//       cart: cartItems
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const user = await userModel.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let cartData = user.cartData;

//     if (!cartData || Array.isArray(cartData)) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     if (!cartData[productId]) {
//       return res.status(400).json({ message: "Product not in cart" });
//     }

//     if (cartData[productId] > 1) {
//       cartData[productId] -= 1;
//     } else {
//       delete cartData[productId];
//     }

//     user.cartData = cartData;
//     user.markModified("cartData");

//     await user.save();

//     res.status(200).json({
//       success: true,
//       cartData: user.cartData
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };