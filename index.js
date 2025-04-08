import express from "express";
import mongoose from "mongoose";
import Employee from "./employeeModel.js";
import cors from "cors";
import bodyParser from "body-parser";

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoUrl="mongodb+srv://user:kuql4YVs8fKBM8kq@cluster0.onc5vma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to mongodb");
})

app.post('/employees',( req , res )=>{
    const employeeData=req.body;
    const employee = new Employee(employeeData);
    employee.save().then(()=>{
        res.send("Student Added Successfully");
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/employees",(req,res)=>{
    Employee.find().then((employees)=>{
        res.send(employees);
    })

})


app.listen(5000,()=>{
    
    console.log("server is running on port 5000");
});

