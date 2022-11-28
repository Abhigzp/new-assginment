import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Employ = () => {
  const navigate = useNavigate();
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [doj, setDoj] = useState("");
  const [Dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [Desigination, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [allEmpData, setAllEmpData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    let result = await fetch("http://localhost:3100/allEmp");
    result = await result.json();
    setAllEmpData(result);
    console.log(result);
  };

  const SaveAll = async (e) => {
    e.preventDefault();
    if (!fname) {
      alert("please fill you  First name ");
      return;
    } else if (!lname) {
      alert("required last name");
      return;
    } else if (!doj) {
      alert("required Date of Joining");
      return;
    } else if (!Dob) {
      alert("required Date of birth");
      return;
    } else if (!salary) {
      alert("required salary ");
      return;
    } else if (!department) {
      alert("required department");
      return;
    } else if (!Desigination) {
      alert("required desigination");
      return;
    }

    const result = await fetch("http://localhost:3100/employe", {
      method: "post",
      body: JSON.stringify({
        fname,
        lname,
        doj,
        Dob,
        salary,
        Desigination,
        department,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    alert("added successfully");
    navigate("/Emp");
  };

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

  // modal functions here
  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => (subtitle.style.color = "");
  const closeModal = () => setIsOpen(false);
  // const el=()=>{console.log("data from el")}
  //--------------------------------------
  return (
    <div>
      <div>
        <div>
          <div
            className="btn btn-primary btn-sm"
            style={{ background: "lightblue", float: "right", margin: "auto" }}
          >
            <button onClick={openModal}>Add Employe</button>{" "}
          </div>
          <h3 className="text-center m-auto">Employe detailes </h3>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h2
                style={{ margin: "auto" }}
                ref={(_subtitle) => (subtitle = _subtitle)}
              >
                Employee Form{" "}
              </h2>
              <form>
                <div>
                  <div>
                    <div>
                      FName-:
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name.."
                        onChange={(e) => setFName(e.target.value)}
                      />
                    </div>
                    <div>
                      LName-:
                      <input
                        type="text"
                        className="form-control"
                        placeholder="lName.."
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <div>
                      DOB-:
                      <input
                        type="date"
                        className="form-control"
                        placeholder="please select Joining Date..."
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div>
                      DOJ-:
                      <input
                        type="date"
                        className="form-control"
                        placeholder="please select Joining Date..."
                        onChange={(e) => setDoj(e.target.value)}
                      />
                    </div>
                    <div>
                      Salary
                      <input
                        type="number"
                        className="form-control"
                        placeholder="salary.."
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>
                    <div>
                      Designation
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Desigination.."
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                    <div>
                      Department
                      <input
                        type="text"
                        className="form-control"
                        placeholder="department.."
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>{" "}
                    <br />
                    <span>
                      <div style={{ float: "right" }}>
                        <button
                          className="btn btn-primary btn-sm-4"
                          type="subbmit"
                          onClick={SaveAll}
                        >
                          Save
                        </button>{" "}
                      </div>
                    </span>
                    <button
                      type="close"
                      className="btn btn-secondary btn-sm-4"
                      style={{ float: "left" }}
                      onClick={closeModal}
                    >
                      close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className="product-list">
          <input
            type="search"
            onChange={handlesrch}
            className="search-product-box"
            placeholder="search-user"
          />
          <ul>
            <li
              style={{ border: "1px solid black", width: "10%", width: "3%" }}
            >
              S.No
            </li>
            {/* <li style={{ width: "11%" }}>UID</li> */}
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              First Name
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              last Name
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              D-O-B
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              D-O-J
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              Salary
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              Designation
            </li>
            <li
              style={{
                backgroundColor: "skyblue",
                border: "1px solid black",
                width: "8%",
              }}
            >
              Department
            </li>
            <li
              style={{
                backgroundColor: "orange",
                border: "1px solid black",
                width: "10%",
              }}
            >
              Action
            </li>
          </ul>
          {allEmpData.length > 0 ? (
            allEmpData.map((item, i) => (
              <ul key={item._id}>
                <li style={{ width: "3%" }}>{i + 1}</li>

                <li style={{ width: "8%" }}>{item.fname}</li>
                <li style={{ width: "8%" }}>{item.lname}</li>
                <li style={{ width: "8%" }}>{item.Dob}</li>
                <li style={{ width: "8%" }}>{item.doj}</li>
                <li style={{ width: "8%" }}>{item.salary}</li>
                <li style={{ width: "8%" }}>{item.Desigination}</li>
                <li style={{ width: "8%" }}>{item.department}</li>
                <li style={{ width: "10%" }}>
                  {" "}
                  <p
                    className="btn btn-danger"
                    onClick={() => deleteUser(item._id)}
                  >
                    Delete
                  </p>
                  <Link to={"/UpdateEmp/" + item._id}> Update</Link>{" "}
                </li>
              </ul>
            ))
          ) : (
            <h1>No Result found </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employ;
