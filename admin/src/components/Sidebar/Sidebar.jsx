import React from 'react'
import './Sidebar.css'

import { assets, url } from '../../assets/admin_assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink   to='/add'  className="sidebar-option">
          <img src={assets.add_icon}  alt="" />
          <p>ADD ITEMS</p>
        </NavLink>
        <NavLink  to='/list'className="sidebar-option">
          <img src={assets.order_icon}  alt="" />
          <p>LIST ITEMS</p>
        </NavLink>
        <NavLink   to='/orders'  className="sidebar-option">
          <img src={assets.order_icon}  alt="" />
          <p>ORDERS</p>
        </NavLink>
        <NavLink to='/addpromo' className="sidebar-option">
  <img src={assets.add_icon} alt="" />
  <p>ADD PROMOCODE</p>
</NavLink>
    <NavLink to="/dashboard" className="sidebar-option  dashboard-item" >
  Dashboard
</NavLink>
      </div>
    </div>
  )
}

export default Sidebar