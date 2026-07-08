import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from "react-toastify";
function List({ url }) {
 
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`)
      
      if (response.data.success) {
        setList(response.data.data)
      // toast.success("Food List Loaded Successfully ");
    } else {
      toast.error("Failed to load food list ");
    }

  } catch (error) {
    console.log(error);
    toast.error("Server Error ");
  }
}
const removeFood = async (id) => {
  try {
    const response = await axios.delete(`${url}/food/remove/${id}`);

    if (response.data.success) {
      toast.success("Item Deleted ");
      fetchList(); // refresh list
    } else {
      toast.error("Failed to delete ");
    }

  } catch (error) {
    toast.error("Server Error ");
  }
};
 useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className='list add flex-col'>
      <p className="page-title">All Foods List</p>
      <div className="list-table">
        <div className="list-format  title">
 <b>Image</b>
  <b>Name</b>
  <b>Category</b>
  <b>Price</b>
  <b>Action</b>
        </div>
       {list.map((item, index) => {
  return (
    <div key={index} className="list-format">
   <img
  src={
    item.image.startsWith("http")
      ? item.image
      : `${url}/images/${item.image}`
  }
  alt={item.name}
/>
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>${item.price}</p>
      <p className='cross'  onClick={() => removeFood(item._id)}>X</p>
    </div>
  );
})}
      </div>
    </div>
  )
}

export default List