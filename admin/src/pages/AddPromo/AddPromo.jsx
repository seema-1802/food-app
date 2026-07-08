import React, { useState } from "react";
import axios from "axios";
import "./AddPromo.css";

const AddPromo = ({ url }) => {

  const [data,setData] = useState({
    code:"",
    discount:""
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();

    const response = await axios.post(
      `${url}/api/promo/add`,
      data
    );

    alert(response.data.message);

    setData({
      code:"",
      discount:""
    });
  }

  return (
    <div className="add-promo">
      <form onSubmit={onSubmitHandler}>
        <h2>Add Promo Code</h2>

        <input
          type="text"
          name="code"
          placeholder="Promo Code"
          value={data.code}
          onChange={onChangeHandler}
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount Amount"
          value={data.discount}
          onChange={onChangeHandler}
        />

        <button type="submit">
          Add Promo
        </button>
      </form>
    </div>
  );
};

export default AddPromo;