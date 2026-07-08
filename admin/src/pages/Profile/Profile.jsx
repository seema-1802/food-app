import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

import { assets } from "../../assets/admin_assets/assets";

const Profile = ({ url }) => {
  const navigate = useNavigate();
const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");
const [passwordData, setPasswordData] = useState({
  oldPassword: "",
  newPassword: "",
});
  const [admin, setAdmin] = useState(null);
const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    photo: "",
  });

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();

  }, [token, navigate]);

  const changePassword = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${url}/api/admin/change-password`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert("Password Changed Successfully");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    console.log(error);
     alert(
    error.response?.data?.message ||
    "Something went wrong"
  );
  }
};
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${url}/api/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setAdmin(res.data.admin);

        setEditData({
          name: res.data.admin.name,
          email: res.data.admin.email,
          photo: res.data.admin.photo || "",
        });
        

      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

    formData.append("name", editData.name);
    formData.append("email", editData.email);

    if (image) {
      formData.append("photo", image);
    }
      const res = await axios.post(
        `${url}/api/admin/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Profile Updated");

  localStorage.setItem("admin", JSON.stringify(res.data.admin));

        fetchProfile();
         setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!admin) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

     <div className="profile-header">

  <div className="profile-left">
    <img
      src={
        admin?.photo
          ? admin.photo.startsWith("http")
            ? admin.photo
            : `${url}/images/${admin.photo}`
          : `https://ui-avatars.com/api/?name=${admin.name}&background=random`
      }
      alt=""
      className="profile-image"
    />
     <button
        className="edit-btn"
        onClick={() => setShowEdit(!showEdit)}
      >
        ✏️
      </button>
  </div>

  <div className="profile-right">
    <h2>{admin.name}</h2>
    <p>{admin.email}</p>

    <span className="role-badge">
      {admin.role}
    </span>
  </div>

</div>
{showEdit && (

    <div className="profile-card">
      <div className="profile-edit add">

  <h3>Edit Profile</h3>

  <div className="add-img flex-col">
    <p>Upload Profile Image</p>

    <label htmlFor="image">
      <img
        src={
          image
            ? URL.createObjectURL(image)
            : editData.photo
            ? `${url}/images/${editData.photo}`
            : assets.upload_area
        }
        alt=""
      />
    </label>

    <input
      type="file"
      id="image"
      hidden
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
  </div>

  <div className="add-product flex-col">
    <p>Name</p>
    <input
      type="text"
      value={editData.name}
      onChange={(e) =>
        setEditData({ ...editData, name: e.target.value })
      }
      placeholder="Enter name"
    />
  </div>

  <div className="add-product flex-col">
    <p>Email</p>
    <input
      type="email"
      value={editData.email}
      onChange={(e) =>
        setEditData({ ...editData, email: e.target.value })
      }
      placeholder="Enter email"
    />
  </div>

  <button type="button" className="add-btn" onClick={updateProfile}>
    SAVE CHANGES
  </button>

</div>

     <div className="profile-actions">

  <div className="profile-password card-box">

    <h3>Change Password</h3>

    <div className="input-group">
      <input
        type="password"
        placeholder="Old Password"
        value={passwordData.oldPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            oldPassword: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={passwordData.newPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            newPassword: e.target.value,
          })
        }
      />
    </div>

    <button className="btn-primary" onClick={changePassword}>
      Change Password
    </button>

  </div>

</div>
</div>
)}
</div>
  );
};

export default Profile;