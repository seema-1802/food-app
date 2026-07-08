import { createContext, useState } from "react";
import { food_list} from '../assets/frontend_assets/assets.js'
import { useEffect } from "react";
export const StoreContext =createContext(null)
import axios from "axios";
const url = " https://food-app-g7b9.onrender.com";
const StoreContextProvider=(props)=>{
    const [cartItem,setCartItem]=useState({});
const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ food_list,setFoodList]=useState([]);
 const [discount, setDiscount] = useState(0);
    const addToCart = async (itemId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const response = await axios.post(
      url + "/cart/addtocart",
      { productId: itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      setCartItem(response.data.cartData);
    }

  } catch (error) {
    console.log(error);
  }
};
  const removeFormCart = async (itemId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const response = await axios.post(
      url + "/cart/removefromcart",
      { productId: itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      setCartItem(response.data.cartData);
    }

  } catch (error) {
    console.log(error);
  }
};
const getTotalCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartItem) {
    if (cartItem[item] > 0) {
    
    let itemInfo = food_list.find(
  (product) => product._id.toString() === item.toString()
);
      
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
  }

  return totalAmount;
};
    useEffect(()=>{
        
    },[cartItem])
    


    useEffect(() => {

  const loadData = async () => {
    try {
      // 1️⃣ Fetch Food List
      const foodResponse = await axios.get(url + "/food/list");
      if (foodResponse.data.success) {
        setFoodList(foodResponse.data.data);
      }

      // 2️⃣ Fetch Cart (only if logged in)
      const token = localStorage.getItem("token");
      if (token) {
        const cartResponse = await axios.get(
          url + "/cart/getcart",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (cartResponse.data.success) {
          let cartData = {};
          cartResponse.data.cart.forEach(item => {
            cartData[item.productId] = item.quantity;
          });
          setCartItem(cartData);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  loadData();

}, []);

      useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
     localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

 const logout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setCartItem({});
};

    const contextValue={
 food_list,
 cartItem,setCartItem,addToCart,removeFormCart,
 getTotalCartAmount,url,login,logout,isLoggedIn,token, discount,
    setDiscount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )}

export default StoreContextProvider