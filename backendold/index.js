const express = require("express");
const app = express();

var client = require("mongodb").MongoClient;
app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
  });


const port  = 3300;    
var url = "mongodb://localhost:27017/"  
var dbo; 

client.connect(url, function(err, res) {
    if (err) throw err;
    console.log("connected");
     dbo = res.db("userrInfo");
    dbo.collection("userData");
    
  });

app.post("/getUser", (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
   const data =dbo.collection("userData").find({}).toArray(function(err, result){
       if(err) throw err;
       console.log(result);
       let findUser = result.find(user=>user.email==email && user.password==password);
       if(findUser){
           res.status(200).send(findUser)
    
       }else{
           res.status(400).send("Not a Valid Credentials");
       }
   });
})

app.post("/postUser",(req,res)=>{
   let body = req.body;
   console.log(body);
   dbo.collection("userData").insertOne(body,(err,result)=>{
       if(err) throw err;
       console.log("Successfully inserted");
       console.log(result);
       
       res.send("");
   });
})

app.listen(port, ()=>console.log(`Server is Live at ${port}`))

  
