const mongoose = require ('mongoose');

const  employeeSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    Dob:String,
    doj:String,
    salary:String,
    Desigination:String,
    department:String,
    user:String,
})

module.exports = mongoose.model("employee",employeeSchema)