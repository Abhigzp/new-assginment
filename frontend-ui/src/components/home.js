import React, { useState, useEffect } from "react";

import "../App.css";

const Home = () => {
 

 
 

  return (
 <>
 <div>
        
        <div style={{ position: "absolute",
               top:"50%",
               left:"50%",
               transform: "translate(-50%, -50%)",
               textalign: "center" 
  }
}
  >
<h1>COMING SOON</h1>
<div className="inprogresshr">
<h6 style={{
   margin: "auto",
   width: "80%",
   textAlign:"center"

}}><span style={{fontWeight: 'bold'}}>Home</span> Page is in Progress.</h6>
</div>
<h6 style={{
  textAlign:"center",
margin: "auto",
width: "60%"
}} onClick={()=>{window.history.go(-1)}}>{"<- Back"}</h6>
</div>
<div
  >
  
</div>

        
        </div>
 </>
  );
};

export default Home;
