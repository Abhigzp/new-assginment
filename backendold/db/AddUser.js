const mongoose = require ('mongoose');

const  AddUserSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String
})

module.exports = mongoose.model("newusers",AddUserSchema)