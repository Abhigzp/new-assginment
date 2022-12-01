const express = require("express");
const app = express();
var cors = require('cors')
require('./db/config');
const AddUserSch=require('./db/AddUserSch');
const User = require('./db/User');
const Employe=require ('./db/Employe')
// const Product=require('./db/Product');
const { response } = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey='e-comm';
const port= 3100
var bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());


app.post("/rejister", async (req,res)=>{
  let user = new User(req.body);
  console.log(req.body);
  user.password=bcrypt.hashSync(user.password,10);
  let result = await  user.save();
  result = result.toObject();
  delete result.password;
 
 Jwt.sign({result},jwtKey,{expiresIn:"30d"},(err,token)=>{
    if(err){
      res.send({result:"Something went wrong ,Please try  after some time"})
    }
    res.send({result,auth:token})
  })
});
 
// app.post("/login",async(req,res)=>{
  
 
 
//   let user = await User.findOne({email:email});
//   // if(user.email==email){
   
//   //   res.send(user)
//   // }
//   // // else if(user.password=== becryptPassword){
    
//   // // }
//   // else{
//   //   res.send({result:"No user found"})
//   // }
//   if(user){
//     res.send(user)
//   }else{
//     res.send({result:"No user found"})
//   }
// })





app.post("/login",async(req,res)=>{
  let user = await User.findOne({email:req.body.email});
  if(user){
let becryptPassword= bcrypt.compareSync(req.body.password, user.password);
if(becryptPassword){
  res.send(user)
}else{
  res.send({message: 'Wrong password'})
} 
  }else{
    res.send({message:"No user found"})
  }
})


app.post("/login",async(req,res)=>{
  let user = await User.findOne({email:req.body.email});
  if(user){
    res.send(user)
  }else{
    res.send({result:"No user found"})
  }
})




// get all data  of users
app.get('/allUsers', async (req,res)=>{
  let data  = await User.find();
  if(data.length>0){
    res.send(data);
  console.log(data);
    }else{
    res.send({result:"no products found"});

  }
});





//delete products 
app.delete('/delProduct/:id', async (req,res)=>{
  const result = await User.deleteOne({_id:req.params.id})
  res.send(result);
})

app.post('/allUser', async (req,res)=>{
 // res.send("user added")
  let user1 = new AddUserSch(req.body);
  let result = await  user1.save();
  res.send(result);
});

// update 
app.get('/delProduct/:id',async (req,res)=>{
  let result = await User.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send({result:"No record found"})
  }
});

app.put('/delProduct/:id',async (req,res)=>{
  let result = await User.updateOne(
    {_id:req.params.id}
    ,{
       $set:req.body
     }
    );

  res.send(result);

});
app.get("/search/:key",async(req,res)=>{
let result = await User.find({
  "$or":[
    { fName:{$regex:req.params.key}},
    { lName:{$regex:req.params.key}},
    { phone:{$regex:req.params.key}},
    { email:{$regex:req.params.key}}
  ]
});
res.send(result);
});


app.get("/searchEmp/:key",async(req,res)=>{
  let result = await Employe.find({
    "$or":[
      { fname:{$regex:req.params.key}},
      { lname:{$regex:req.params.key}},
      { Dob:{$regex:req.params.key}},
      { doj:{$regex:req.params.key}},
      { Dob:{$regex:req.params.key}},
      { salary:{$regex:req.params.key}}, 
      { Desigination:{$regex:req.params.key}},
      { department:{$regex:req.params.key}}
    ]
  });
  res.send(result);
  });
app.post("/employe", async (req,res)=>{
  let emp = new Employe(req.body);
  console.log(req.body);
  let result = await emp.save();
  result = result.toObject(); 
});

app.get('/allEmp', async (req,res)=>{
  let data  = await Employe.find();
  if(data.length>0){
    res.send(data);
  console.log(data);
    }else{
    res.send({result:"no products found"});
  }
});



app.delete('/delEmp/:id', async (req,res)=>{
  const result = await Employe.deleteOne({_id:req.params.id})
  res.send(result);
})



app.get('/delEmp/:id',async (req,res)=>{
  let result = await Employe.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send({result:"No record found"})
  }
});

app.put('/delEmp/:id',async (req,res)=>{
  let result = await Employe.updateOne(
    {_id:req.params.id}
    ,{
       $set:req.body
     }
    );

  res.send(result);

});


app.listen(port, ()=>console.log(`Server is Live at ${port}`));