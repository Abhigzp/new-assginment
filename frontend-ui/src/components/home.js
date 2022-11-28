import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
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

  return (
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
              {" "}
              <button
                className="btn btn-danger"
               
                onClick={() => deleteUser(item._id)}
              >
                delete
              </button>
              <Link to={"/upproducts/" + item._id}> update</Link>{" "}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result found </h1>
      )}
    </div>
  );
};

export default Home;
