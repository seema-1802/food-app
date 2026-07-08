import React, { useState ,useContext} from 'react'
import'./Login.css'
import cross_icon from "../../assets/frontend_assets/cross_icon.png";
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";
import { auth } from "../../FireBase/Firebase";

function Login({setShowLogin,}) {
    const [currState,setCurrState]=useState("Sign Up")
     const { url, login} = useContext(StoreContext) 
    const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
const [loginMethod, setLoginMethod] = useState("google");
const [otpVerified, setOtpVerified] = useState(false);
const [newPassword, setNewPassword] = useState("");
const [otp, setOtp] = useState("");
const [emailOtp, setEmailOtp] = useState("");
  //  Input Change Handler
  const onChangeHandler = (e) => {
     const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name]: value }))

  } 
 const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      let response

      if (currState === "Sign Up") {
        response = await axios.post(`${url}/user/register`, data)
      } else {
        response = await axios.post(`${url}/user/login`, {
          email: data.email,
          password: data.password
        })
      }
        if (response.data.success) {
          console.log("TOKEN =", response.data.token);
  console.log("USERID =", response.data.userId);

  login(response.data.token, response.data.userId);

  console.log("AFTER LOGIN token:", localStorage.getItem("token"));
  console.log("AFTER LOGIN userId:", localStorage.getItem("userId"));
  setShowLogin(false);

      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error)
      alert("Server Error")
    }
  }
  const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const response = await axios.post(
      `${url}/user/google-login`,
      {
        email: user.email,
        name: user.displayName,
        googleId: user.uid
      }
    );

    

    if (response.data.success) {
      login(response.data.token, response.data.userId);
      setShowLogin(false);
    }

  } catch (error) {
    console.log(error);
  }
};
const sendEmailOtp = async () => {
  const response = await axios.post(
    `${url}/user/send-email-otp`,
    {
      email: data.email
    }
  );

  alert("OTP Sent");
};
const verifyEmailOtp = async () => {
  const response = await axios.post(
    `${url}/user/verify-email-otp`,
    {
      email: data.email,
      otp: emailOtp
    }
  );

  if (response.data.success) {
    login(
      response.data.token,
      response.data.userId
    );

    setShowLogin(false);
  }
  else{
     alert("Wrong OTP. Please click 'Send OTP' again and enter the latest OTP sent to your email."
      );
      setEmailOtp("");
  }
};
const verifyForgotOtp = async () => {
  try {
    const response = await axios.post(
      `${url}/user/verify-email-otp`,
      {
        email: data.email,
        otp: emailOtp
      }
    );

    if (response.data.success) {
      setOtpVerified(true);
      alert("OTP Verified Successfully");
    } else {
      alert("Wrong OTP. Please click 'Send OTP' again and enter the latest OTP sent to your email."
      );
      setEmailOtp("");
    }

  } catch (error) {
    alert("Wrong OTP. Please click 'Send OTP' again and enter the latest OTP sent to your email."
      );
    console.log(error);
  }
};
const updatePassword = async () => {

  const response = await axios.post(
    `${url}/user/update-password`,
    {
      email: data.email,
      newPassword
    }
  );

  if (response.data.success) {

    login(
      response.data.token,
      response.data.userId
    );

    setShowLogin(false);
  }
};
return (
    <div className="login-popup">
        <div  className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={cross_icon} alt="close" />
            </div>
            <form  onSubmit={onSubmitHandler} className="login-input">
  {currState === "Sign Up" &&  (
    <input   onChange={onChangeHandler} name="name"  value={data.name} type="text" placeholder="Your Name" required />
  )}

  <input   name="email"   value={data.email}
              onChange={onChangeHandler} type="email" placeholder="Your Email" required />
  <input    name="password"
             onChange={onChangeHandler}
            value={data.password} type="password" placeholder="Password" required />


{currState === "Login" && (
  <div className="forgot-password">
   <span onClick={() => {
  setLoginMethod("forgotPassword");
  setOtpVerified(false);
}}>
  Forgot Password?
</span>
  </div>
)}
<button type='submit'>
  {currState === "Sign Up" ? "Create Account" : "Login"}
</button>
{currState === "Sign Up" && loginMethod !== "email" && (
<div className="social-login-section">
  <p className="divider">
    <span>Or continue with</span>
  </p>

  <button
    type="button"
    className="google-btn"
    onClick={googleLogin}
  >
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt="Google"
    />
    Continue with Google
  </button>

  <button
    type="button"
    className="email-otp-btn"
    onClick={() => setLoginMethod("email")}
  >
    📧 Continue with Email OTP
  </button>
</div>
)}

{loginMethod === "email" && (
  <div className="otp-box">
      <button
      type="button"
      className="back-btn"
      onClick={() => setLoginMethod("google")}
    >
      ← Back
    </button>
    <input
      type="email"
      placeholder="Enter Email"
      value={data.email}
      onChange={onChangeHandler}
      name="email"
    />

    <button
      type="button"
      className="send-otp-btn"
      onClick={sendEmailOtp}
    >
      Send OTP
    </button>

    <input
      type="text"
      placeholder="Enter OTP"
      value={emailOtp}
      onChange={(e) => setEmailOtp(e.target.value)}
    />

    <button
      type="button"
      className="verify-otp-btn"
      onClick={verifyEmailOtp}
    >
      Verify OTP
    </button>
  </div>
)}

{loginMethod === "forgotPassword" && (
  <div className="otp-box">

    <button
      type="button"
      className="back-btn"
      onClick={() => setLoginMethod("google")}
    >
      ← Back
    </button>

    <input
      type="email"
      placeholder="Enter Registered Email"
      value={data.email}
      onChange={onChangeHandler}
      name="email"
    />

    {!otpVerified && (
      <>
        <button
          type="button"
          onClick={sendEmailOtp}
        >
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={emailOtp}
          onChange={(e) =>
            setEmailOtp(e.target.value)
          }
        />

        <button
          type="button"
          onClick={verifyForgotOtp}
        >
          Verify OTP
        </button>
      </>
    )}

    {otpVerified && (
      <>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <button
          type="button"
          onClick={updatePassword}
        >
          Update Password
        </button>
      </>
    )}

  </div>
)}
<div className="login-condition">
 
  <input type="checkbox" required />
  <p>By continuing, I agree to the terms of use & privacy policy</p>
</div>
    </form>

{currState === "Login" ? (
  <p>
    Create a new account{" "}
    <span onClick={() => setCurrState("Sign Up")}>
      Click here
    </span>
  </p>
) : (
  <p>
    Already have an account?{" "}
    <span onClick={() => setCurrState("Login")}>
      Login here
    </span>
  </p>
)}
          </div>
         
    </div>
  )
}

export default Login