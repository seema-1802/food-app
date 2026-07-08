import React, { useContext, useState,useEffect } from 'react'
import "./Navbar.css"

import basketIcon from '../../assets/frontend_assets/basket_icon.png'
import profileIcon from '../../assets/frontend_assets/profile_icon.png';
import bagIcon from '../../assets/frontend_assets/bag_icon.png';
import logoutIcon from '../../assets/frontend_assets/logout_icon.png';
import logo from '../../assets/frontend_assets/logo.png'
import searchIcon from '../../assets/frontend_assets/search_icon.png'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";
function Navbar({setShowLogin}) {
const [menu,setMenu]=useState("home");
const {getTotalCartAmount, isLoggedIn, logout,food_list}=useContext(StoreContext);
 const [showSearch, setShowSearch] = useState(false);
const [searchText, setSearchText] = useState("");

 const navigate = useNavigate();
const handleLogout = () => {
  logout();
   navigate("/");
};
const filteredItems = food_list.filter((item) =>
  item.name.toLowerCase().includes(searchText.toLowerCase())
);


const handleMenuClick = () => {
  navigate("/");

  setTimeout(() => {
    const section = document.getElementById("explore-menu");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, 200);
};
const handleContactClick = () => {
  navigate("/");

  setTimeout(() => {
    const section = document.getElementById("footer");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, 200);
};
  return (

    <div className='navbar'> 
    <Link to='/' ><img src={logo} alt="Logo" className='logo' /></Link>
     <ul className='navbar-menu'>
      <Link to='/' onClick={()=>setMenu("home")}  className={ menu==='home'?"active":""}>home</Link>
      <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setMenu("menu");
    handleMenuClick();
  }}
  className={menu === "menu" ? "active" : ""}
>
  Menu
</a>
       <Link 
  to="/myorders"
  onClick={() => setMenu("myorders")}
  className={menu === "myorders" ? "active" : ""}
>
  my orders
</Link>
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setMenu("contact-us");
    handleContactClick();
  }}
  className={menu === "contact-us" ? "active" : ""}
>
  Contact Us
</a>
      </ul>
    
    <div className="navbar-right">
         <img
  src={searchIcon}
  alt="search"
  onClick={() => {
    setShowSearch(!showSearch);
    setSearchText("");
  }}
  style={{ cursor: "pointer" }}
/>

   {showSearch && (
  <div className="search-box">
    <input
      type="text"
      placeholder="Search food..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
)}

{showSearch && searchText && (
  <div className="search-results">
    {filteredItems.length > 0 ? (
      filteredItems.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))
    ) : (
      <p>No items found</p>
    )}
  </div>
)}
      <div className="nanbar-search-icon">
       <Link to='/Cart'><img src={basketIcon} alt="basket" /></Link>  

        
        <div className={getTotalCartAmount()===0?"":"dot"}>

        </div>
      </div>
      
       {isLoggedIn ? (
        <div className="navbar-profile">
          <img src={profileIcon} alt="" />
          <div className="navbar-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={bagIcon}  alt="" /><p>Orders</p></li>
            <hr/>
            <li onClick={handleLogout}> <img  src={logoutIcon} alt="Logout" className='logout-icon' /><p>Logout</p></li>
          </div>
        </div>
        
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>

  )
}
export default Navbar