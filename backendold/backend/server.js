const express = require("express");
const app = express();
var cors = require('cors')
require('./db/config');
const AddUserSch=require('./db/AddUserSch');
const User = require('./db/User');
const Product=require('./db/Product');
const { response } = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey='assignment';
const port= 3100
var bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());

app.post("/rejister", async (req,res)=>{
  let user = new User(req.body);
  console.log(req.body);
  // user.password=bcrypt.hashSync(user.password,10);
  let result = await  user.save();
  // result = result.toObject();
  // delete result.password;
  // res.send(result);

  // Jwt.sign({result},jwtKey,{expiresIn:"30d"},(err,token)=>{
  //   if(err){
  //     res.send({result:"Something went wrong ,Please try  after some time"})
  //   }
  //   res.send({result,auth:token})
  // })
});

app.post("/products", async (req,res)=>{
  let product=new Product(req.body);
  let result = await product.save();
  res.send(result);
  
})  
// app.post('/login',async (req,res)=>{
//   console.log(req.body);

//   if ( req.body.email && req.body.role){
//     let user =  await User.findOne(req.body).select("-password");
//     if(user){
//     Jwt.sign({user},jwtKey,{expiresIn:"30d"},(err,token)=>{
//       if(err){
//         res.send({result:"Something went wrong ,Please try  again"})
//       }
//       res.send({user,auth:token})
//     })
// } else{
//   res.send({result:"no user found"})
// }
//  }else {
//   res.send({reult:"no user found"});
//  }
// });

app.post("/login",async(req,res)=>{
  let user = await User.findOne({email:req.body.email});
 let becryptPassword= bcrypt.compareSync(req.body.password, user.password);
 console.log(becryptPassword);
 console.log(user);
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
    { role:{$regex:req.params.key}},
    { email:{$regex:req.params.key}}
  ]
});
res.send(result);
});


app.listen(port, ()=>console.log(`Server is Live `));