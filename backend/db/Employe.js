const mongoose = require ('mongoose');

const  employeeSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    Dob:String,
    Doj:String,
    Salary:String,
    Designation:String,
    Department:String,
})

module.exports = mongoose.model("employee",employeeSchema)