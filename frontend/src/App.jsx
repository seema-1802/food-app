import React, { useState } from 'react'
import Navbar from './componets/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './page/PlaceOrder/PlaceOrder'
import Home from './page/Home/Home'
import Cart from './page/Cart/Cart'
import Footer from './componets/Footer/Footer'
import Login from './componets/Login/Login'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from './page/Verify/Verify'
import MyOrder from './page/MyOrder/MyOrder'
function App() {
 
    const [showLogin,setShowLogin]=useState(false)
    
     return (
    <>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    {showLogin?<Login  setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route  path='/' element={<Home/>}> </Route>
          <Route path='/Cart' element={<Cart/>}></Route>
<Route path='/order' element={<PlaceOrder/>}></Route>
       <Route path='/verify' element={<Verify/>}></Route>
              <Route path='/myorders' element={<MyOrder/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )

}

export default App