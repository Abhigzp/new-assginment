import React from "react";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");

 

  const formHandle = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:3100/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.fName) {
      localStorage.setItem("user", JSON.stringify(result));
      alert("login  successful");
      navigate("/");
    } else {
      alert("you are not rejisterd");
    }
  };
  return (
    <div
      className="container m-auto"
      style={{ width: "500px", margin: "auto" }}
    >
      <div className="form mt-4 pt-4">
        <h3 className="text-center m-auto">Login page</h3>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button text-center pt-4">
            <button className="btn btn-primary btn-sm" onClick={formHandle}>
              Login
            </button>
          </div>
          <div className="button text-center pt-4">
          <p className="pt-3">
            Don't have account ? please{" "}
            <span className="text-info">
             <Link to="/SignUp"><b>SignUp</b></Link>
            </span>
            here.
          </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
