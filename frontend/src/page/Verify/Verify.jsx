import React , { useEffect } from 'react'
import './Verify.css'
import { useSearchParams , useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
function Verify() {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success")
const orderId=searchParams.get("orderId")
const {url,token}=useContext(StoreContext);
  const navigate = useNavigate();
 
const verify = async () => {
  try {
    const response = await axios.post(
      `${url}/api/orders/verify-new-order`,
      { success, orderId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
    );

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (error) {
    navigate("/");
  }
};

useEffect(() => {
  if (orderId) {
    verify();
  }
}, [orderId]);
    return (
    <div className='verify'>
<div className="spinner"></div>


    </div>
  )
}

export default Verify