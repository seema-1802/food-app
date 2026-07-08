import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

function ExploreMenu({category,setCategory}) {
  return (
    <div className="explore-menu" id='explore-menu'>
<h1>Explore Our Menu</h1>
<p className='explore-menu-text'> Explore our wide range of mouth-watering meals and find your favorite today.
</p>
<div className="explore-menu-list">
    {menu_list.map((item,index)=>{
        return (
            <div  onClick={() => {
  
  setCategory(item.menu_name);
}}key={index} className='explore-item'>
                <img  className={category===item.menu_name?"active":""} src={item.menu_image } alt=""/>
                <p>{item.menu_name}</p>
              </div>  
        )
    })}
</div>
<hr/>
    </div>

  )
}

export default ExploreMenu