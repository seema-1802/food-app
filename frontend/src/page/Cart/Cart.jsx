import React, { useContext, useState } from 'react'
import './Cart.css'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
function Cart() {
  const {cartItem,food_list,removeFormCart, getTotalCartAmount,url,  discount,
    setDiscount}=useContext(StoreContext);
  const navigator=useNavigate();
  const [promoCode, setPromoCode] = useState("");
// const [discount, setDiscount] = useState(0);
const applyPromoCode = async () => {
  try {
    const response = await axios.post(
      `${url}/api/promo/apply`,
      {
        code: promoCode.trim(),
      }
      
    );
 
    if (response.data.success) {
      setDiscount(response.data.discount);
      alert("Promo Code Applied");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Error applying promo code");
  }
};
const subtotal = getTotalCartAmount();
const deliveryFee = subtotal === 0 ? 0 : 2;
const total = subtotal + deliveryFee - discount;
return (
  
<div className="cart">
<div className="cart-item">
  <div className="cart-title">
    <p>Items</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
  </div>
  <br/>
  <hr/>
 {food_list.map((item,index) => {
  if (cartItem[item._id] > 0) {
    return (
      <div  key={item._id}> 
      <div  className=" cart-title cart-itemm">
        <img
  src={
    item.image.startsWith("http")
      ? item.image
      : `${url}/images/${item.image}`
  }
  alt={item.name}
/>
        {/* <img src={url+"/images/"+item.image} alt="" /> */}
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>{cartItem[item._id]}</p>
        <p>${item.price * cartItem[item._id]}</p>
        <p onClick={()=>removeFormCart(item._id)  } className='cross'>x</p>
      </div>
      <hr/>
      </div>
      
    );
  }
  return null;
})}
</div>
<div className="cart-bottom">

  <div className="cart-total">
    <h2>Cart Totals</h2>
  

  <div className="cart-details">
    <p>Subtotal</p>
    <p>${ getTotalCartAmount()}</p>
  </div>
  <hr/>



   <div className="cart-details">
    <p>Delivery Fee</p>
    <p>${getTotalCartAmount()===0?0:2}</p>
  </div>
  
  <hr/>
  <div className="cart-details">
  <p>Discount</p>
  <p>-${discount}</p>
</div>
<hr />
  
   <div className="cart-details">
    <p>Total</p>
    <p>${total < 0 ? 0 : total}</p>
    {/* <p>${ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p> */}
  </div>

  <button onClick={()=>navigator('/order')}>PROCESS TO CHECKOUT</button>
  </div>
  </div>


<div className="cart-promocode">
  <div>
    <p>If you have a promo code ,Enter it here</p>
    <div className="cart-input">
      <input type="text"  placeholder='promo code'
       value={promoCode}
  onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={applyPromoCode} >Submit</button>
    </div>
  </div>
</div>




</div>
  )
}

export default Cart