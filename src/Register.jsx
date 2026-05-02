import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function Register() {

const { register, handleSubmit, reset } = useForm();
const navigate = useNavigate();

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

const handleLogout = () => {

localStorage.removeItem("loggedUser");

alert("Logged out successfully");

navigate("/login");

};

const onSubmit = (data) => {

const previousUsers = JSON.parse(localStorage.getItem("users")) || [];

const alreadyExists = previousUsers.find(
user => user.email === data.email
);

if(alreadyExists){
alert("User already registered. Please login.");
navigate("/login");
return;
}

previousUsers.push(data);

localStorage.setItem("users", JSON.stringify(previousUsers));

alert("Registration Successful ✅ Please Login");

reset();

navigate("/login");

};

return (

<div className="register-container">

<div className="register-card shadow-lg">

{loggedUser ? (

<div className="text-center">

<h2 className="welcome-title">
Welcome {loggedUser.fullname} 👋
</h2>

<button
className="btn btn-danger logout-btn"
onClick={handleLogout}
>
Logout
</button>

</div>

) : (

<>

<h2 className="register-title text-center">
Create Account
</h2>

<form onSubmit={handleSubmit(onSubmit)}>

<div className="mb-3">

<input
className="form-control"
placeholder="Full Name"
{...register("fullname",{required:true})}
/>

</div>

<div className="mb-3">

<input
type="email"
className="form-control"
placeholder="Email"
{...register("email",{required:true})}
/>

</div>

<div className="mb-3">

<input
type="password"
className="form-control"
placeholder="Password"
{...register("password",{required:true})}
/>

</div>

<div className="mb-3">

<input
type="tel"
className="form-control"
placeholder="Mobile Number"
{...register("mobile",{required:true})}
/>

</div>

<button
type="submit"
className="btn btn-success w-100 register-btn"
>
Register
</button>

</form>

<div className="text-center mt-3">

<p>
Already have an account?
<span
className="login-link"
onClick={()=>navigate("/login")}
>
 Login
</span>
</p>

</div>

</>

)}

</div>

</div>

);

}

export default Register;