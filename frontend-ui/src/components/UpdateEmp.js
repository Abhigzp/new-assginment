import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const UpdateEmp = () => {
const[data,setData]=useState()
const [fName,setFname] = useState();
const[lName,setLName] = useState();
const [Dob,setDob]=useState();
const [Doj,setDoj]=useState();
const [salary,setSalary]=useState();
const [Designation,setDesignation]=useState();
const [Department,setDepartment]=useState();
const params = useParams();


    useEffect(() => {
        allData();
      }, []);
    
      const allData = async () => {
        let result = await fetch("http://localhost:3100/allEmp");
        result = await result.json();
        setData(result);
        setFname(result.fName)
        setLName(result.LName)
        setDob(result.Dob)
        setDoj(result.Doj)
        setSalary(result.salary);
        setDesignation(result.Designation)
        setDepartment(result.Department)

        console.log("value of result",result);
      };
      console.log("products Data Orignal", data);
    //   console.log("name values ", allEmpData.firstName);
    
      const  handleChange =()=>{

      }

      const SaveAll = ( ) => {

      }
  
 
    return (
    <div>
       <h1>Update detailes</h1>
            <form>
              <div className="container m-auto">
                <div className="form mt-4 pt-4">
                  <div className="form-group">
                    FName-:
                    <input
                      type="text"
                      placeholder="Name.."
                      onChange={handleChange}
                      value={fName}
                    />
                  </div>
                  <div>
                    LName-:
                    <input
                      type="text"
                      placeholder="lName.."
                      onChange={handleChange}
                      value={lName}
                    />
                  </div>
                  <div>
                    Dob-:
                    <input
                      type="date"
                      placeholder="lName.."
                      onChange={handleChange}
                      value={Dob}
                    />
                  </div>
                  <div>
                    DOJ-:
                    <input
                      type="date"
                      placeholder="please select Joining Date..."
                      onChange={handleChange}
                      value={Doj}
                    />
                  </div>
                  <div>
                    Salary
                    <input
                      type="number"
                      placeholder="salary.."
                      onChange={handleChange}
                      value={salary}
                    />
                  </div>
                  <div>
                    Designation
                    <input
                      type="text"
                      placeholder="Desigination.."
                      onChange={handleChange}
                      value={Designation}
                    />
                  </div>
                  <div>
                    Department
                    <input
                      type="text"
                      placeholder="department.."
                      onChange={handleChange}
                      value={Department}
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
}

export default UpdateEmp