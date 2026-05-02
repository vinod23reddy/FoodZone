import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
  const reduxOrders = useSelector((state) => state.orders);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.orders) {
      setOrderHistory(loggedUser.orders);
    } else {
      setOrderHistory(reduxOrders || []);
    }
  }, [reduxOrders]);

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <div className="orders-page">
        <h2 className="orders-title">Order History</h2>
        <p className="no-orders">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2 className="orders-title">Order History</h2>

      <div className="orders-container">
        {orderHistory.map((order, idx) => (
          <div className="order-card" key={order.orderId || idx}>
            <div className="order-header">
              <p><strong>Order ID:</strong> {order.orderId || "N/A"}</p>
              <p><strong>Date:</strong> {order.date || "Unknown Date"}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalPrice || 0}</p>
            </div>

            <ul className="order-items">
              {(order.items || []).map((item, i) => (
                <li key={i} className="order-item">
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
