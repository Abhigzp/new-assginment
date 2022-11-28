import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateEmp = () => {
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [doj, setDoj] = useState("");
  const [Dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [Desigination, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    allData();
  }, []);

  const allData = async () => {
    let result = await fetch(`http://localhost:3100/delEmp/${params.id}`);
    result = await result.json();
    console.log("result value", result);
    setFName(result.fname);
    setLname(result.lname);
    setDob(result.Dob);
    setDoj(result.doj);
    setSalary(result.salary);
    setDesignation(result.Desigination);
    setDepartment(result.department);
  };

  const SaveAll = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:3100/delEmp/${params.id}`, {
      method: "put",
      body: JSON.stringify({
        fname,
        lname,
        Dob,
        doj,
        salary,
        Desigination,
        department,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    alert("Employee updated successful");
    navigate("/Emp");
  };

  return (
    <div>
      <h1>Update detailes</h1>
      <form>
        <div className="container m-auto">
          <div className="form mt-4 pt-4">
            <div className="form-group">
              First_Name-:
              <input
                type="text"
                placeholder="Name.."
                onChange={(e) => setFName(e.target.value)}
                value={fname}
              />
            </div>
            <div>
              Last_Name-:
              <input
                type="text"
                placeholder="lName.."
                onChange={(e) => setLname(e.target.value)}
                value={lname}
              />
            </div>
            <div>
              DOB-:
              <input
                type="date"
                placeholder="lName.."
                onChange={(e) => setDob(e.target.value)}
                value={Dob}
              />
            </div>
            <div>
              DOJ-:
              <input
                type="date"
                placeholder="please select Joining Date..."
                onChange={(e) => setDoj(e.target.value)}
                value={doj}
              />
            </div>
            <div>
              Salary :-
              <input
                type="number"
                placeholder="salary.."
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
              />
            </div>
            <div>
              Designation :-
              <input
                type="text"
                placeholder="Desigination.."
                onChange={(e) => setDesignation(e.target.value)}
                value={Desigination}
              />
            </div>
            <div>
              Department :-
              <input
                type="text"
                placeholder="department.."
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
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
                  Update
                </button>
              </div>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmp;
