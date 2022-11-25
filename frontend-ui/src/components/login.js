import React from "react";
import { useNavigate } from "react-router-dom";
// import SignUp from './signup'
const Login = () => {
    const navigate = useNavigate();
  const handleChange = () => {};

  const signUp = () => {};


  const Login=()=>{

  }

//   const SignUphndl=()=>{

//   }
  return (
    <div>
      <div className="container m-auto">
        {/* {loginStatus?<UserInfo/>:!signUp? */}
        <div  style={{width:"500px",margin:"auto"}}   className="form mt-4 pt-4">
          <h2 className="text-center m-auto">Login Page</h2>
          <small className="text-danger text-center">{}</small>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="input"
              name="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="button text-center pt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => Login()}
            >
              Login
            </button>
          </div>
          <p className="pt-3">
            Don't have account ? please{" "}
            <span className="text-info">
              <b onClick={() => signUp()}>SignUp</b>
            </span>
            here.
          </p>
        </div>
        {/* : */}
    {/* <span onClick={SignUphndl}> <SignUp/> </span> */}
      </div>
    </div>
  );
};
export default Login;
