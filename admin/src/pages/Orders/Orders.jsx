import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import parcelIcon from '../../assets/admin_assets/parcel_icon.png' // FIXED PATH

function Orders({ url }) {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`)
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])
  const handleStatusChange = async (e, orderId) => {
  const status = e.target.value;

  await axios.post(`${url}/api/orders/status`, {
    orderId,
    status
  });

  fetchOrders(); // refresh orders
};

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">

            <img src={parcelIcon} alt="parcel" />

            <div>
              <p className='order-food'>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p className='order-name'>
                {order.address.firstname + " " + order.address.lastname}
              </p>

              <div className='order-address'>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className='order-phone'>{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>

            <select   onChange={(e) => handleStatusChange(e, order._id)}
  value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders