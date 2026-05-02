import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCode } from "react-qr-code";
import { useDispatch } from "react-redux";
import { clearCart } from "./CartSlice";
import { addOrder } from "./orderSlice";
import "./Checkout.css";
import { toast } from "react-toastify";
import emailjs from "emailjs-com"; // ✅ import at the top
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, finalAmount, customerEmail, orderId } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return <h2>No order found!</h2>;
  }


const handlePayment = () => {
  confirmAlert({
    title: "Confirm Your Order",
    message: `Are you sure you want to place order ${orderId}?`,
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          const purchaseDetails = {
            id: orderId,
            date: new Date().toLocaleString(),
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            })),
            totalPrice: finalAmount.toFixed(2),
            orderId,
            email: customerEmail,
          };

          // Save order in Redux + localStorage
          dispatch(addOrder(purchaseDetails));
          const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
          if (loggedUser) {
            if (!loggedUser.orders) loggedUser.orders = [];
            loggedUser.orders.push(purchaseDetails);
            localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
          }

          // ✅ EmailJS send call here
          const templateParams = {
            order_id: orderId,
            customer_email: customerEmail,
            items: cartItems.map(
              item => `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
            ).join("\n"),
            total: finalAmount.toFixed(2),
            message: `Thank you for ordering with Sindhu Restaurant! Your order ${orderId} has been placed successfully.`
          };


          toast.success(`✅ Order ${orderId} placed successfully!`, {
            position: "top-right",
            autoClose: 3000,
          });

          dispatch(clearCart());
          navigate("/orders");
        }
      },
      {
        label: "No",
        onClick: () => toast.info("Order cancelled")
      }
    ]
  });
};

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">🧾 Secure Checkout</h1>

        {/* Order Summary */}
        <div className="summary-box">
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={item.id + "-" + index} className="checkout-item">
              <span>{item.name}</span>
              <span>
                {item.quantity} x ₹{item.price}
              </span>
            </div>
          ))}
          <hr />
          <div className="total-payable">
            <span>Total Payable</span>
            <span>₹{finalAmount.toFixed(2)}</span>
          </div>
          <p className="email-display">📧 {customerEmail}</p>
          <p className="order-id">🆔 Order ID: {orderId}</p>
        </div>

        {/* Payment Selection */}
        <div className="payment-section">
          <h2>Select Payment Method</h2>
          <div className="payment-buttons">
           <button
  onClick={() =>
    confirmAlert({
      title: "Confirm Payment",
      message: `Are you sure you want to proceed with QR payment for order ${orderId}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => setPaymentMethod("qr")
        },
        {
          label: "No",
          onClick: () => toast.info("QR payment cancelled")
        }
      ]
    })
  }
  className="pay-btn"
>
  📱 QR Payment
</button>

            <button onClick={() => setPaymentMethod("card")} className="pay-btn">
              💳 Card Payment
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        {paymentMethod === "qr" && (
          <div className="qr-section">
            <h3>Scan QR to Pay ₹{finalAmount.toFixed(2)}</h3>
            <QRCode
              value={`upi://pay?pa=mounikasaikarri@ybl&pn=SindhuRestaurant&am=${finalAmount}&cu=INR`}
            />
            <button className="confirm-pay-btn" onClick={handlePayment}>
              ✅ Confirm Payment
            </button>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="card-disabled">
            💳 Card Payment Currently Not Available
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
