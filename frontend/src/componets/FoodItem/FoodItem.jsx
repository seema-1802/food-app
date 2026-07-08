import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { StoreContext}  from '../../context/StoreContext';


function FoodItem({id,name,price,description,image,}) {
  const [liked, setLiked] = useState(false);
  const{cartItem,addToCart,removeFormCart,url}=useContext(StoreContext)
  
  return (
    <div className="food-item">
      <div className="food-item-container" >
   <img
  className="food-image"
  src={
    image?.startsWith("http")
      ? image
      : `${url}/images/${image}`
  }
  alt={name}
/>
          {/* <img className="food-image" src={url+"/images/"+image} alt={name} /> */}
           {/* <span
          className="like-btn"
          onClick={() => setLiked(!liked)}
        >
          {liked ? "❤️" : "🤍"}
        </span> */}
          {!cartItem[id]?<img className='add' onClick={()=>addToCart(id)} src={"/add_icon_white.png"} />
:<div className='food-count'>
<img onClick={()=>removeFormCart(id)} src={"/remove_icon_red.png"} alt=''/>
<p>{cartItem[id]}</p>
<img onClick={()=>addToCart(id)} src={"/add_icon_green.png"} alt=''/>
</div>
}
          </div>
          <div className="food-info">
<div className="food-name">
            <p>{name}</p>

            <img src="/rating_starts.png" alt="Rating stars" />
</div>


          
          <p className="food-dese">{description}</p>
          <p className="food-price">${price} </p>
        </div>
      </div>
      
  )
}

export default FoodItem