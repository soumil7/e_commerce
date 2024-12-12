import React, { useState, useEffect } from 'react';
import './Order.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        toast.error("No orders found");
        setOrders([]);
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-list">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <p className="order-item-foo">
                    {/* Validate order.items before mapping */}
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {idx !== order.items.length - 1 ? ", " : ""}
                        </span>
                      ))
                    ) : (
                      <span>No items available</span>
                    )}
                  </p>
                  <p className="order-item-name">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address?.street},</p>
                    <p>
                      {order.address?.city}, {order.address?.state},{" "}
                      {order.address?.country}, {order.address?.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address?.phone}</p>
                </div>
                <p>Items: {order.items?.length || 0}</p>
                <p>₹{order.amount}</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Item Processing">Items Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;



// import React, { useState, useEffect } from 'react';
// import './Order.css';
// import { toast } from "react-toastify";
// import axios from "axios";
// import { assets } from "../../assets/assets";

// const Order = ({ url }) => {

//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(url + "/api/item/list");
//       if (response.data.success) {
//         setOrders(response.data.data);
//       } else {
//         toast.error("Error fetching orders");
//       }
//     } catch (error) {
//       toast.error("Network error");
//       console.error("Error fetching orders:", error);
//     }
//   }

//   const statusHandler = async (event, orderId) => {
//     const response = await axios.post(url+"/api/order/status", {
//       orderId,
//       status:event.target.value
//     })
//     if(response.data.success){
//       await fetchAllOrders();
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="order add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="Parcel Icon" />
//             <div>
//               <p className="order-item-foo">
//                 {order.items.map((item, index) => (
//                   <span key={index}>
//                     {item.name} x {item.quantity}{index !== order.items.length - 1 ? ', ' : ''}
//                   </span>
//                 ))}
//               </p>
//               <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
//               <div className="oredr-item-address">
//                 <p>{order.address.street+","}</p>
//                 <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
//               </div>
//               <p className="order-item-phone">{order.address.phone}</p>
//             </div>
//             <p>Items: {order.items.length}</p>
//             <p>₹{order.amount}</p>
//             <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
//               <option value="Item Processing">Items Processing</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Order;
