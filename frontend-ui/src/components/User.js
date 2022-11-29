import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "40%",
    left: "70%",
    right: "auto",
    bottom: "auto",
    marginRight: "auto",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};

const User = () => {
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    let result = await fetch("http://localhost:3100/allUsers");
    result = await result.json();
    setProducts(result);
    console.log(result);
  };
  console.log("products Data Orignal", products);
  console.log("name values ", products.name);

  const handlesrch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3100/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      allData();
    }
  };

  const deleteUser = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await fetch(`http://localhost:3100/delProduct/${id}`, {
              method: "delete",
            });
            result = await result.json();
            if (result) {
              // alert("record is deleted");
              allData();
            }
          },
        },
        { label: "No" },
      ],
    });
  };
 


  const savedata = async (e) => {
    e.preventDefault();
      if (!fName ) {
        alert("please fill you name ");
        return;
      } 
      else if(!phone ){
        alert("required Number")
        return;
      }
      else if(phone.length <= 10 ){
        alert("number not to be  less then 10 digits");
        return;
      } 
      else if(!lName){
           alert("please fill last name ")
           return;
      }
      else if (!email){ 
        alert("please email adress");
        return;
      }
      else if(!password.length>8){
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
    alert("user Added successfully")
    navigate("/User");
    
  };
  // modal functions here
  let subtitle;
  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => (subtitle.style.color = "");
  const closeModal = () => setIsOpen(false);
  return (
    <div>
       <div className="btn btn-primary btn-sm" style={{ background: "lightblue", float: "right" }}  >
        <button onClick={openModal}>Add User</button>{" "}
          </div>
          {/* <h3 className="text-center m-auto">User detailes </h3> */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              New User{" "}
            </h2>
           <form>
         <div style={{ width: 400, margin:"auto", height: "auto" }}>
         <label>First_Name</label>
          <input
            type="text"  className="form-control" placeholder="Enter Name"  value={fName} onChange={(e) => setFName(e.target.value)}  />
            
         
          <label>Last_Name</label>
          <input type="text"  className="form-control" placeholder="Enter Name" onChange={(e) => setLName(e.target.value)} /> 

          <label>Phone</label>
          <input type="number" className="form-control" placeholder="Enter phone..." onChange={(e) => {  setPhone(e.target.value)} } />
                 
          <div className="form-group">
          <label>Email </label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          <small className="form-text text-muted">
           
            </small>    </div>
       
          <div className="form-group">
            <label>Password</label>
            <input  type="password" className="form-control"  placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
             
                  
                  <br />
                  <span>
                    <div style={{ float: "right" }}>
                      <button className="btn btn-primary btn-sm-4" type="subbmit" onClick={savedata}  > Save </button>
                      
                    </div>
                  </span>
                  <button  type="close" className="btn btn-secondary btn-sm-4" style={{ float: "left" }} onClick={closeModal} > close </button>
                </div>
                </div>
            </form>
          </Modal>

          <div className="product-list">
      <h3>User List</h3>
      <input
        type="search"
        onChange={handlesrch}
        className="search-product-box"
        placeholder="search-user"
      />
      <ul>
        <li style={{ width: "5%" }}>S.No</li>
        {/* <li style={{ width: "11%" }}>UID</li> */}
        <li style={{ width: "10%" }}>First Name</li>
        <li style={{ width: "10%" }}>last Name</li>
        {/* <li style={{ width: "7%" }}>Role</li> */}
        <li style={{ width: "10%" }}>phone</li>
        <li style={{ width: "18%" }}>Email</li>
        <li >Action</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, i) => (
          <ul key={item._id}>
            <li style={{ width: "5%" }}>{i + 1}</li>
            
            <li style={{ width: "10%" }}>{item.fName}</li>
            <li style={{ width: "10%" }}>{item.lName}</li>
            
            <li style={{ width: "10%" }}>{item.phone}</li>
            <li style={{ width: "18%" }}>{item.email}</li>
            <li>
              <button className="btn btn-danger" onClick={() => deleteUser(item._id)}> delete </button>
              <Link to={"/upproducts/" + item._id}> update</Link>{" "}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result found </h1>
      )}
    </div>
     
          
    </div>
     
     
 
  );
};

export default User;
