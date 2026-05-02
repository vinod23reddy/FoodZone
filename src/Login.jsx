import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";   // 👈 Make sure this is imported
import "./Login.css";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // ✅ If already logged in redirect to home
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      navigate("/home");
    }
  }, [navigate]);

  const loginLogics = (loginData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user exists
    const existingUser = users.find(user => user.email === loginData.email);

    if (!existingUser) {
      toast.info("You are not registered. Please register first.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/register");
      return;
    }

    const validUser = users.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (validUser) {
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      reset();
      toast.success(`Welcome ${validUser.fullname} 👋`, {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/home");
    } else {
      toast.error("Invalid Password ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 👇 Toast container must be inside your component tree */}
        <ToastContainer position="top-center" autoClose={3000} />
        
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit(loginLogics)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="form-control mb-3"
          />

          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>
        </form>

        {/* 👇 Extra message for users without account */}
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-primary fw-bold">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
