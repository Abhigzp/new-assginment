import React from 'react'

const Signup = () => {


const handleChange=()=>{

}

 const signUp=()=>{

 }   
  return (
<div className="container">
      <div className="form mt-4">
      <h2 className="text-center m-auto">SignUp Page</h2>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" placeholder="Enter your name" className="form-control" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" className="form-control" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="text" name="password" placeholder="Enter your password" className="form-control" onChange={handleChange}/>
      </div>
      <div className="button text-center pt-4">
              <button className="btn btn-primary btn-sm" onClick={()=>signUp()}>Sign Up</button>
       </div>
      </div>
    </div>
  )
}
export default Signup;
