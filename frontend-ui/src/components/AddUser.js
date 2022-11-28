import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select';

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [phone, setPhone] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [isError, setIsError] = useState(false);
  // const [] = ['Admin', 'Trainer', 'Member'];


  const [uid, setUid] = useState();
  const[role,setRole]=useState();
  
  // const options = [
  //   { value: 'admin', label: 'admin' },
  //   { value: 'trainer', label: 'trainer' },
  //   { value: 'member', label: 'member' }
  // ]
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //     alert("already Sign in");
  //   }
  // },[]);


  // genrate UID number logic

const Uid=()=> {
    // return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    
    const data= Math.random().toString(36).substring(2).toUpperCase();
    setUid(data);
   
}



const UID = Math.random().toString(36).substring(2).toUpperCase();

console.log('random', UID)

  const savedata = async (e) => {
    e.preventDefault();
    // let validation = new password();
      if (!fName ) {
        alert("please fill you name ");
        return;
      }  if(!phone ){
        alert("required Number")
        return;
      }else if(phone.length <= 10 ){
        alert("number not to be  less then 10 digits");
        return;
      } else if(!lName){
      alert("please fill last name ")
  return;
      }else if(!role){
        alert("please select  role ")
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
      body: JSON.stringify({ fName,lName,role,UID, phone, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    console.log(data);
    
    // localStorage.setItem("user", JSON.stringify(data));
    alert("Rejistration successfully")
    navigate("/");
    
  };
  return (
    <div>
      <form
        style={{
          float: "left",
          margin: "auto",
        }}
      >
        <h6>User added</h6>
        <div
          style={{
            width: 400,
            height: "auto",
            border: "2px solid black",
            float: "left",
            padding: "5px",
          }}
        >
          {/* <label>UID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          /> */}

          <label>First_Name</label>
          <input
            type="text"  
            className="form-control"
            placeholder="Enter Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <label>Last_Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            // value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <label>Role</label> 
          <select  onChange={(e)=> {
            const selectRole = e.target.value;
            setRole(selectRole);
          }}  className="form-control">
            
            <option>Choose Role</option>
            <option vlaue={role}>Admin</option>
            <option value={role}>Trainer</option>
            <option value={role}>Member</option>

            
            
         
  
           {/* <option>Please choose one option</option> */}
          
             {/* {role.map((option, index) => {
                   return <option key={index} >
                        {option}
                  </option>
                 })} */}
             
          </select>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          /> */}

           
          <label>Mobile</label>
          <input
            
            type="number"
            maxlength="10"
            pattern="[1-9]{1}[0-9]{9}"
            className="form-control"
            placeholder="Enter phone..."
            // value={phone}
            onChange={(e) => {
              // if ( e.target.value.match(/[^0-9]/) === null && 
              //                e.target.value.length <= 10
              //             ){
              //               setPhone(e.target.value)
              //             }
                
               setPhone(e.target.value)
            
             }
          }
          />
          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">
           
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Remember me </label>
          </div> */}
          <br />
          {/* <div className="form-group">
            <label>Upload Your picture</label>
            <input type="file" className="form-control-file" />
          </div> */}
          <br />
          <button
            type="submit"
            className="btn btn-primary "
            style={{ float: "right" }}
            onClick={savedata}
          >
            Save
          </button>
        </div>
      </form>
     
    </div>
  );
};

export default AddUser;
