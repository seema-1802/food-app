import React, { useEffect, useState } from 'react'
import './Add.css'

import { assets } from '../../assets/admin_assets/assets';
import axios from "axios";
function Add({ url }) {

    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
  const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const handleSubmit = async(e) => {
  e.preventDefault();
  try {
  const formData = new FormData();
  console.log(image);
console.log(data);
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("image", image);
  const response = await axios.post(`${url}/food/add`, formData);

    if (response.data.success) {
      alert("Product Added Successfully ");

      // 🔄 Reset form fields
      setData({
        name: "",
        description: "",
        price: "",
        category: "salad"
      });

      // 🔄 Reset image
      setImage(false);
    }
  } catch (error) {
    console.log(error);
    alert("Error while adding product ");
  }
 
};
  return (
    <div className='add' >
        <form  onSubmit={handleSubmit} >
        <div className="flex-col">
            <div className="add-img flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image"  hidden required/>
            </div>
             <div className="add-product flex-col">
                <p>Product name</p>
             
                <input  onChange={onChangeHandler} value={data.name} type="text" name='name'  placeholder='Type here'/>
            </div>
         
             <div className="add-product-drs flex-col">
                <p>Product Description</p>
                <textarea   onChange={onChangeHandler} value={data.description} name="description" rows="6"  placeholder='Write here' required></textarea>
                </div>

                   <div className='add-category'>
                 <div className="add-cate-pr flex-col">
                <p>Product category</p>
              <select  onChange={onChangeHandler} value={data.category} name='category'>
               <option value="salad">Salad</option>
  <option value="rolls">Rolls</option>
  <option value="desserts">Desserts</option>
  <option value="sandwich">Sandwich</option>
  <option value="cake">Cake</option>
  <option value="pure-veg">Pure Veg</option>
  <option value="pasta">Pasta</option>
  <option value="noodles">Noodles</option>
  <option value="pizza">Pizza</option>
  <option value="burger">Burger</option>
              </select>
              
               </div>
            </div>


<div className="add-price flex-col">
    <p>Product Price</p>
    <input onChange={onChangeHandler} value={data.price}  type="number" name='price' placeholder='$20' />
    {/* <input
  type="number"
  min="1"
  max="5"
  name="rating"
  placeholder="Rating"
/> */}
</div>

        </div>
        <button type='submit' className='add-btn'>ADD</button>
</form>
    </div>
  )
}

export default Add