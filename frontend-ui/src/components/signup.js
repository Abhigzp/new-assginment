import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  
  const navigate = useNavigate();
    
    // const UID = Math.random().toString(36).substring(2).toUpperCase();

    // console.log('random', UID)



  

  const savedata = async (e) => {
    e.preventDefault();

      if (!fName ) {
        alert("please fill you name ");
        return;
      }  if(!phone ){
        alert("fill your Number")
        return;
      }else if(phone.length<10){
        alert("number should be 10 digits");
        return;
      } else if(!lName){
      alert("please fill last name ")
  return;
      }else if (!email){
        alert("please email adress");
        return;
      }else if(!password.length>8){
        alert("your password is more than 8 digits")
        return;
      }

    const result = await fetch("http://localhost:3100/rejister", {
      method: "post",
      body: JSON.stringify({ fName,lName, phone, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    alert("all data save successfully")
    navigate("/login");
  };
  return (
    <div className="container m-auto"
    style={{ width: "500px", margin: "auto" }}>
      <form  className="form-group">
        <h4 className="text-center m-auto">Sign in Page</h4>
        <div >
          <label>First_Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setFName(e.target.value)}
          />
          <label>Last_Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setLName(e.target.value)}
          />
          <label>Mobile</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              // onChange={(e) => passwordFun(e)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button text-center pt-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            style={{ float: "right" }}
            onClick={savedata}
          >
            Submit
          </button>
          </div>
        </div>
      </form>
     
    </div>
  );
};

export default SignUp;
