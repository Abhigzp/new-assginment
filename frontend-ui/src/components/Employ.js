import axios from 'axios';
import React from 'react'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Modal from "react-modal";
const customStyles = {
    content: {
      top: "40%",
      left: "70%",
      right: "auto",
      bottom: "auto",
      marginRight: "auto",
      width:"500px",
      transform: "translate(-50%, -50%)",
    },
  }
 
const Employ = () => {
    const [data,setData]=useState();

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [allEmpData, setAllEmpData] = useState([]);
    const [employedetailes, setEmployeDetailes] = useState({
      First_Name: "",
      Last_Name: "",
      Doj: "",
      Salary: "",
      Desigination: "",
      Department: "",
    });
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setEmployeDetailes((values) => ({ ...values, [name]: value }));
    };
    const SaveAll= async (e)=>{
        // const result = await fetch("http://localhost:3100/addemployee", {
        //     method: "post",
        //     body: JSON.stringify({employedetailes }),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        //   let data = await result.json();
        //   console.log(data);
        console.log(employedetailes)
    }

    

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    let result = await fetch("http://localhost:3100/allEmp");
    result = await result.json();
    setAllEmpData(result);
    console.log(result);
  };
  console.log("products Data Orignal", allEmpData);
  console.log("name values ", allEmpData.firstName);

  const deleteUser = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await fetch(`http://localhost:3100/delEmp/${id}`, {
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

// modal functions here 
    const openModal=()=> setIsOpen(true)
    const afterOpenModal=()=> subtitle.style.color = ""; 
    const closeModal=()=> setIsOpen(false);
    // const el=()=>{console.log("data from el")}
  //--------------------------------------      
 return (
    <div>
        <div>
      <div>
        <div className="btn btn-primary btn-sm"  style={{ background: "lightblue",float:"right" }}>
        <button onClick={openModal}>Add Employe</button> </div>
        <h3 className="text-center m-auto" >Employe detailes </h3>
        
        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} 
          onRequestClose={closeModal} style={customStyles}  contentLabel="Example Modal" >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Employee detailes{" "}
          </h2>
          <h3>----------------------------------------</h3>

          <form>
            <div className="container m-auto">
                <div className="form mt-4 pt-4">
              <div className="form-group">
               FName-:
                <input type="text" placeholder="Name.." onChange={handleChange} />
              </div>
              <div>
                LName-:
                <input type="text" placeholder="lName.." onChange={handleChange} />
              </div>
              <div>
                DOJ-:
               <input type="date" placeholder="please select Joining Date..." onChange={handleChange}/>
              </div>
              <div>
               Salary
                <input type="number" placeholder="salary.."  onChange={handleChange}/>
              </div>
              <div>
                Designation
                <input type="text" placeholder="Desigination.." onChange={handleChange} />
              </div>
              <div>
                Department
                <input type="text" placeholder="department.." onChange={handleChange} />
              </div> <br/>
              <span>
                <div   style={{ float:"right" }} >
                <button className="btn btn-primary btn-sm-4" type="subbmit" onClick={SaveAll}>
                  add Employee
                </button>{" "} </div>
              </span>

              <button  type="close" className="btn btn-secondary btn-sm-4" style={{ float:"left" }} onClick={closeModal}>
                close
              </button>
            </div>
            </div>
          </form>
        </Modal>
      </div>
      <div className="product-list">
      <ul>
        <li style={{border:"1px solid black",width: "10%", width: "3%" }}>S.No</li>
        {/* <li style={{ width: "11%" }}>UID</li> */}
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>First Name</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>last Name</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>D-O-B</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>D-O-B</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>Salary</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>Designation</li>
        <li style={{ backgroundColor:"skyblue",border:"1px solid black",width: "8%" }}>Department</li>
        <li style={{ backgroundColor:"orange",border:"1px solid black",width: "10%" }} >Action</li>
      </ul>
      {allEmpData.length > 0 ? (
        allEmpData.map((item, i) => (
          <ul key={item._id}>
            <li style={{ width: "3%" }}>{i + 1}</li>
            
            <li style={{ width: "8%" }}>{item.firstName}</li>
            <li style={{ width: "8%" }}>{item.lastName}</li> 
            <li style={{ width: "8%" }}>{item.Dob}</li>
            <li style={{ width: "8%" }}>{item.Doj}</li>
            <li style={{ width: "8%" }}>{item.Salary}</li>
            <li style={{ width: "8%"}}>{item.Designation}</li>
            <li style={{ width: "8%"}}>{item.Department}</li>
            <li style={{ width: "10%"}}>
              {" "}
              <p
                className="btn btn-danger"
               
                onClick={() => deleteUser(item._id)}
              >
                Delete
              </p>
              <Link to={"/upproducts/" + item._id}> Update</Link>{" "}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result found </h1>
      )}
      </div>
    </div>
    </div>
  )
}

export default Employ