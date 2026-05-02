import React from "react";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Desserts from "./Desserts";
import Mocktails from "./Mocktails";
import Soups from "./Soups";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Cart from "./Cart";
import NotFound from "./NotFound";
import Profile from "./Profile";
import Navbar from "./Navbar";
// import BlogPost from "./BlogPost";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Orders";
import Register from "./Register";
import Checkout from "./Checkout";
import ContactUs from "./ContactUs";
import { ToastContainer } from "react-toastify";


function App() {

//   const items = useSelector((globalState) => globalState.cart);
//   let totalQuantity = items.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

  
//     const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

//     const handleLogout = () => {
//   localStorage.removeItem("loggedUser");
//   toast.success("Logged out successfully"); // 👈 toast instead of alert
//     window.location.href = "/login";
// };

  return (
    <BrowserRouter>

<Navbar/>
      <ToastContainer position="top-right" 
      autoClose={2000}   
      hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> {/* 👈 add this */}
<div className="page-content">
<Routes>

<Route path="/" element={<Navigate to="/home" />} />
<Route path="/home" element={<Home />} />
<Route path="/soups" element={<Soups />} />
<Route path="/veg" element={<Veg />} />
<Route path="/nonveg" element={<NonVeg />} />
<Route path="/dessert" element={<Desserts />} />
<Route path="/mocktails" element={<Mocktails />} />
<Route path="/aboutus" element={<AboutUs />} />
<Route path="/cart" element={<Cart />} />
<Route path="/profile" element={<Profile />} />
<Route path="/orders" element={<Orders />} />
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/checkout" element={<Checkout/>}/>
<Route path="/contactus" element={<ContactUs/>}/>
<Route path="/navbar" element = {<Navbar/>} />
<Route path="*" element={<NotFound />} />

</Routes>
      <ToastContainer position="top-right" autoClose={2000} />
</div>

</BrowserRouter>
  );
}

export default App;