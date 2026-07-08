import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
  const{getTotalCartAmount,url, cartItem, food_list, discount}=useContext(StoreContext)
 const [data, setData] = useState({
  firstname: "",
  lastname: "",
  email: "",
    address: "", 
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: ""
});
const handleChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value
  });
};

const subtotal = getTotalCartAmount();
const deliveryFee = subtotal === 0 ? 0 : 2;
const total = Math.max(subtotal + deliveryFee - discount, 0);

const place = async (event) => {
  event.preventDefault();

  const orderItems = [];

  food_list.forEach((item) => {
    if (cartItem[item._id] > 0) {
      let itemInfo = { ...item }; // clone item
      itemInfo.quantity = cartItem[item._id];
      orderItems.push(itemInfo);
    }
  });

  const orderData = {
    address: data,
    items: orderItems,
  //   amount:
  //     getTotalCartAmount() +
  //     (getTotalCartAmount() === 0 ? 0 : 2),
  // };
   amount: total,
    discount,
  };

  try {
    const token = localStorage.getItem("token");
  
    

    const response = await axios.post(
      `${url}/api/orders/stripe`,
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      window.location.replace(response.data.sessionUrl);
    }

  } catch (error) {
     if (error.response && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }
  }
};
  const token = localStorage.getItem("token");
const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  })
  return (
    <form   onSubmit={place}  className='place-order'>
    <div className="delivery-form">

  <p className='title'>Delivery Information</p>

  {/* Name */}
  <div className="form-row">
  
   <input
   required 
        type="text"
        name="firstname"
        placeholder="First Name"
        value={data.firstname}
        onChange={handleChange}
      />
      <input
      required 
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={data.lastname}
        onChange={handleChange}
      />
  
   </div>

  {/* Address */}
  
  <input
  required 
  type="email"
  name="email"
  placeholder="Email"
  value={data.email}
  onChange={handleChange}
/>
   <input
   required 
        type="text"
        name="street"
        placeholder="Street Address"
        value={data.street}
        onChange={handleChange}
      />

   
  

  {/* City & State */}
  <div className="form-row">
    
   
      <input
      required 
        type="text"
        name="city"
        placeholder="City"
        value={data.city}
        onChange={handleChange}
      />
    <input
    required 
        type="text"
        name="state"
        placeholder="State"
        value={data.state}
        onChange={handleChange}
      />
   </div>

  {/* Zip & Country */}
  <div className="form-row">
     <input
     required 
        type="text"
        name="zipcode"
        placeholder="Zip Code"
        value={data.zipcode}
        onChange={handleChange}
      />
    <input required   onChange={handleChange} name="country" value={data.country} type="text" placeholder="Country" />
  </div>

  {/* Phone */}
  <div className="form-row">
    <input  required  name="phone"
        
        value={data.phone}
        onChange={handleChange} type="text" placeholder="Phone Number" />
  </div>

</div>
<div className='place-right'>
  
  <div className="cart-total">
    <h2>Cart Totals</h2>
  
<div className="cart-details">
    <p>Subtotal</p>
    <p>${subtotal}</p>
</div>

<hr/>

<div className="cart-details">
    <p>Delivery Fee</p>
    <p>${deliveryFee}</p>
</div>

<hr/>

<div className="cart-details">
    <p>Discount</p>
    <p>-${discount}</p>
</div>

<hr/>

<div className="cart-details">
    <p>Total</p>
    <p>${total}</p>
</div>

  <button  type='submit'>PROCESS TO PAYMENTT</button>
  </div>
  
</div>
</form>
  )
}

export default PlaceOrder