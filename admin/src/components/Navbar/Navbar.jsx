
import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { assets,url } from "../../assets/admin_assets/assets";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");

    navigate("/login");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />

      <div className="profile-wrapper">
     <img
  className="profile"
  src={
    token
      ? admin?.photo
        ? admin.photo.startsWith("http")
          ? admin.photo
          : `${url}/images/${admin.photo}`
        : assets.profile_image
      : assets.profile_image
  }
  alt=""
  onClick={() => setShowMenu(!showMenu)}
  style={{ cursor: "pointer" }}
/>
        {showMenu && (
          <div className="profile-dropdown">

            {!token ? (
              <>
                <p onClick={() => navigate("/login")}>
                  Login
                </p>
              </>
            ) : (
              <>
                <p onClick={() => navigate("/profile")}>
                  My Profile
                </p>

               

                <p onClick={handleLogout}>
                  Logout
                </p>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;