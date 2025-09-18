import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to database file
const dataFile = path.join(process.cwd(), "data", "students.json");

// Ensure file exists
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]", "utf8");
}

// Helpers to read/write students
const readStudents = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
  } catch {
    return [];
  }
};

const writeStudents = (students) => {
  fs.writeFileSync(dataFile, JSON.stringify(students, null, 2), "utf8");
};

// Default route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// ✅ GET all students
app.get("/api/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});

// ✅ POST new student
app.post("/api/students", (req, res) => {
  const { name, age, course, year, status } = req.body;

  if (!name || !age || !course || !year) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const students = readStudents();
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    course,
    year,
    status: status || "active",
  };

  students.push(newStudent);
  writeStudents(students);

  res.status(201).json(newStudent);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
