import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login({ url }) {
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (currState === "Sign Up") {
        response = await axios.post(
          `${url}/api/admin/register`,
          data
        );
      } else {
        response = await axios.post(
          `${url}/api/admin/login`,
          {
            email: data.email,
            password: data.password,
          }
        );
      }

      if (response.data.success) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "adminId",
          response.data.adminId
        );

        navigate("/profile");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };
return (
  <div className="login-container">

    <div className="login-box">

      <h2>{currState}</h2>

      <form onSubmit={onSubmitHandler}>

        {currState === "Sign Up" && (
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          required
        />

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
      </form>

      {currState === "Login" ? (
        <p className="login-switch">
          Create new account?{" "}
          <span onClick={() => setCurrState("Sign Up")}>
            Sign Up
          </span>
        </p>
      ) : (
        <p className="login-switch">
          Already have an account?{" "}
          <span onClick={() => setCurrState("Login")}>
            Login
          </span>
        </p>
      )}

    </div>
  </div>
);
}

export default Login;