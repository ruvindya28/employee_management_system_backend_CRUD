import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Employee from "./employeeModel.js"; // Make sure this is correctly defined

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUrl = "mongodb+srv://user:kuql4YVs8fKBM8kq@cluster0.onc5vma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Add new employee
app.post("/employees", (req, res) => {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    employee.save().then(() => {
        res.send("Employee added successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Failed to add employee");
    });
});

// Get all employees
app.get("/employees", (req, res) => {
    Employee.find().then((employees) => {
        res.send(employees);
    }).catch((err) => {
        res.status(500).send("Error fetching employees");
    });
});

// Delete employee by MongoDB _id
app.delete("/employees/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID format");
    }

    try {
        const deleted = await Employee.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).send("Employee not found");
        }
        res.send("Deleted Successfully");
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
});

app.put("/employees/:id", async (req, res) => {
    const reg = req.params.id;
    Employee.findByIdAndUpdate(reg, req.body).then(() => {
       res.send("Updated Successfully"); 
    })
})
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
