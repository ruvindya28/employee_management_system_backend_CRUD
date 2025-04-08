import mongoose from "mongoose";

const employeeModel=new mongoose.Schema({
    reg :{
        type:String,
        require:true
    },
    name :{
        type:String,
        require:true
    },
    date :{
        type:String,
        require:true
    }
    
})

const Employee = mongoose.model("employees",employeeModel)

export default Employee