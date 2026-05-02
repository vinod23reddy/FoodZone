import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuant, decreaseQuant, removeCart, clearCart } from "./CartSlice";
import { applyCoupon, resetCoupon } from "./couponSlice";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { discount, applied } = useSelector((state) => state.coupon);

  const [discountPer, setDiscountPer] = useState(0);
  const [input, setInput] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (discountPer / 100) * totalAmount;
  const couponDiscount = (discount / 100) * totalAmount;
  const finalAmount = totalAmount - discountAmount - couponDiscount;

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setCustomerEmail(loggedUser.email);
    }
  }, []);

  useEffect(() => {
    if (input) {
      if (applied) {
        toast.success("🎉 Coupon applied!");
      } else {
        toast.error("Invalid coupon");
      }
    }
  }, [applied]);

  const handleCheckout = () => {
    if (!customerEmail) {
      toast.warning("⚠️ Please enter your email first");
      return;
    }

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
      toast.warning("⚠️ Please login to continue");
      navigate("/login");
      return;
    }

    const orderId = generateOrderId();

    const templateParams = {
      order_id: orderId,
      orders: cartItems.map(item => `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`).join(", "),
      cost: {
        shipping: 0.0,
        tax: 0.0,
        total: finalAmount.toFixed(2)
      },
      email: customerEmail,
    };

    if (!loggedUser.orders) loggedUser.orders = [];
    loggedUser.orders.push({
      id: orderId,
      date: new Date().toLocaleString(),
      items: cartItems,
      totalPrice: finalAmount.toFixed(2),
      email: customerEmail
    });
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    emailjs
      .send("service_51t75ub", "template_yesfx9a", templateParams, "EQ7h92Oh4-oLx3dIw")
      .then(() => toast.success("✨ Email sent successfully!"))
      .catch(() => toast.error("Email failed"));

    navigate("/checkout", {
      state: { cartItems, finalAmount, customerEmail, orderId },
    });

    dispatch(clearCart());
  };

  const handleApplyCoupon = () => {
    if (!input.trim()) return;
    const couponCode = input.trim().toUpperCase();
    dispatch(applyCoupon(couponCode));
    setInput(couponCode);
  };

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        {cartItems.length > 0 && (
          <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
            🗑 Clear Cart
          </button>
        )}
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 && (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add delicious food from the menu 🍽️</p>
        </div>
      )}

      {/* Two-column layout */}
      {cartItems.length > 0 && (
        <div className="cart-page">
          {/* LEFT SIDE: Items */}
          <div className="cart-left">
            {cartItems.map((item, index) => (
              <div key={item.id + "-" + index} className="cart-item">
                <img src={item.imageLoc} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="cart-btns">
                  <button onClick={() => dispatch(increaseQuant(item))}>+</button>
                  <button onClick={() => dispatch(decreaseQuant(item))}>-</button>
                  <button onClick={() => dispatch(removeCart(item))}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Checkout */}
          <div className="cart-right">
            <div className="total-box">
              <div className="price-row">
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              {discountPer > 0 && (
                <div className="price-row">
                  <span>Discount</span>
                  <span>- ₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              {applied && (
                <div className="price-row">
                  <span>Coupon</span>
                  <span>- ₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="final-price">
                <span>Final Amount</span>
                <span>₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {totalAmount > 1000 && (
              <div className="discount-box">
                <h3>Special Discount</h3>
                <button onClick={() => setDiscountPer(10)}>10%</button>
                <button onClick={() => setDiscountPer(20)}>20%</button>
                <button onClick={() => setDiscountPer(30)}>30%</button>
                <button onClick={() => setDiscountPer(0)}>Reset</button>
              </div>
            )}

            {totalAmount > 1000 && (
              <div className="coupon-box">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleApplyCoupon}>Apply</button>
                <button onClick={() => dispatch(resetCoupon())}>Reset</button>
              </div>
            )}

            {!customerEmail && (
              <div className="email-box">
                <label>Enter email for order confirmation</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
            )}

            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
