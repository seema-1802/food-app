import React, { useContext, useState, useEffect } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import parcelIcon from '../../assets/frontend_assets/parcel_icon.png'

function MyOrder() {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `${url}/api/orders/userorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setData(response.data.orders)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order) => (
          <div className="my-order" key={order._id}>
            <img src={parcelIcon} alt="Parcel Icon" />

            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>

            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>

            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>

            <button 
              onClick={fetchOrders}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Track Order"}
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrder