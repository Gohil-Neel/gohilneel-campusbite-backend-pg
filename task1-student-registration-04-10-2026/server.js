const express = require("express");
const fs = require("fs/promises");
const formConfig = require("./JSONConfig/studentConfig");
const multer = require("multer");

const app = express();


app.use(express.json());

const PORT = 3000;
//Listen to the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

//Validation function for student data
function validateStudent(student, students) {
    const errors = {};

    for (const field in formConfig) {

        const rules = formConfig[field];
        const value = student[field];

        // Required validation
        if (rules.required) {

            if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
                errors[field] = rules.messages.required;
                continue;
            }
        }

        // String length validation
        if (rules.validation?.minLength) {
            if (value.length < rules.validation.minLength) {
                errors[field] = rules.messages.minLength;
            }
        }

        if (rules.validation?.maxLength) {
            if (value.length > rules.validation.maxLength) {
                errors[field] = rules.messages.maxLength;
            }
        }

        // Pattern validation
        if (rules.validation?.pattern) {
            const pattern = new RegExp(rules.validation.pattern);

            if (!pattern.test(value)) {
                errors[field] = rules.messages.pattern;
            }
        }

        // Number minimum
        if (rules.validation?.min !== undefined) {
            if (value < rules.validation.min) {
                errors[field] = rules.messages.min;
            }
        }

        // Number maximum
        if (rules.validation?.max !== undefined) {
            if (value > rules.validation.max) {
                errors[field] = rules.messages.max;
            }
        }

        // Minimum selections
        if (rules.minSelection !== undefined) {
            if (!Array.isArray(value) || value.length < rules.minSelection) {
                errors[field] = rules.messages.required;
            }
        }

        // Unique validation
        if (rules.unique) {
            const exists = students.some(
                existingStudent => existingStudent[field] === value
            );

            if (exists) {
                errors[field] = rules.messages.unique;
            }
        }
    }
    return errors;
}

//Upload configuration for multer(File upload)
const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
});

//Get all student & Get student by ID
app.get("/api/students", async (req, res) => {
    const data = await fs.readFile("./data/students.json", "utf-8");

    const students = JSON.parse(data);

    res.json(students);
})
.get("/api/students/:id", async (req, res) => {
    const data = await fs.readFile("./data/students.json", "utf-8");
    const students = JSON.parse(data);

    const id = parseInt(req. params.id);

    const sid = students.findIndex(student => student.id === id);

    if(sid === -1) {
        return res.status(404).json("Student Not Found");
    }
    
    res.json(students[sid]);
})


//Add new student
app.post("/api/students", upload.single("passportPhoto"), async (req, res) => {
    console.log("POST ROUTE REACHED");
    console.log(req.body);
    console.log(req.file);

    try {
        const data = await fs.readFile("./data/students.json", "utf-8");
        const students = JSON.parse(data);

        const studentData = {
            ...req.body,

            skills: req.body.skills? req.body.skills.split(",").map(x => x.trim()):[],

            hobbies: req.body.hobbies? req.body.hobbies.split(",").map(x => x.trim()): [],

            passportPhoto: req.file
        };

        const errorsMessage = validateStudent(studentData, students);

        if (Object.keys(errorsMessage).length > 0) {
            return res.status(400).json({
                errors: errorsMessage
            });
        }

        const newStudent = {
            ...req.body,
            id: Date.now(),
        };

        students.push(newStudent);

        await fs.writeFile("./data/students.json", JSON.stringify(students, null, 2));

        res.status(201).json(newStudent);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
})



app.put("/api/students/:id", async (req, res) => {
    try {
        const data = await fs.readFile("./data/students.json", "utf-8");
        const students = JSON.parse(data);

        const id = parseInt(req.params.id);

        const studentIndex = students.findIndex(
            student => student.id === id
        );

        if (studentIndex === -1) {
            return res.status(404).json({ error: "Student not found" });
        }

        students[studentIndex] = {
            ...students[studentIndex],
            ...req.body,
            id: id
        };

        await fs.writeFile("./data/students.json", JSON.stringify(students, null, 2));

        res.status(200).json(students[studentIndex]);

    } catch (error) {
        console.log(error.message);

        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete("/api/students/:id", async (req, res) => {
    try {
        const data = await fs.readFile("./data/students.json", "utf-8");

        const students = JSON.parse(data);

        const id = parseInt(req.params.id);

        const studentIndex = students.findIndex(
            student => student.id === id
        );

        if (studentIndex === -1) {
            return res.status(404).json({ error: "Student not found" });
        }

        const deletedStudent = students.splice(studentIndex, 1);

        await fs.writeFile("./data/students.json", JSON.stringify(students, null, 2));

        res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({ error: "Internal Server Error" });
    }
});


