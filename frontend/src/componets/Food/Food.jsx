import React,{useContext} from 'react'
import './Food.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
function Food({category}) {
    const {food_list} =useContext(StoreContext)
    const normalize = (text) =>
    text.toLowerCase().replace(/\s+/g, "-");
  return (
<div className="food-display" id='food-display'>
    <h2>Top dishes near you</h2>
    <div className="food-list">
        {food_list.map((item,index)=>{
          if(category==='All'|| normalize(item.category) === normalize(category))
return <FoodItem key={index} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price}    />
        })}
    </div>
</div>
  )
}

export default Food