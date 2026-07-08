import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import AddPromo from './pages/AddPromo/AddPromo.jsx'
import Profile from './pages/Profile/Profile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Dashboard from './pages/Dashboard/Dashboard.jsx'
function App() {
    const url = "http://localhost:5000"
  return (
    <div>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  theme="colored"
/>
      <Navbar/>
      <hr />
      <div className="app-content">
  <Sidebar/>
  <Routes>
    <Route path="/" element={<Login url={url} />} />
    <Route path='/add' element={<Add url={url} />}/>
     <Route path='/list' element={<List  url={url} />}/>
     <Route path='/orders' element={<Orders  url={url}/>}/>
    <Route path="/addpromo" element={<AddPromo url={url} />} />
    <Route path="/login" element={<Login url={url} />} />
    <Route path="/profile" element={<Profile url={url} />} />
     <Route path="/dashboard" element={<Dashboard url={url} />} />
    
 
  </Routes>
      </div>
    
      </div>
  )
}

export default App