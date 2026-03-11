const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const filePath = path.join(__dirname, 'students.json');
// function to read students from file
function readStudents() {
 try {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
 } catch (error) {
  return [];
 }
}

// function to write students to file
function writeStudents(data) {
 fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all students
app.get('/students', (req, res) => {
 try {
  const students = readStudents();
  res.json(students);
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch students" });
 }
});

// GET student by ID
app.get('/students/:id', (req, res) => {
 try {
  const students = readStudents();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
   return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);

 } catch (error) {
  res.status(500).json({ error: "Server error while fetching student" });
 }
});

// ADD new student
app.post('/students', (req, res) => {
 try {

  const { name, age, department } = req.body;

  if (!name || !age || !department) {
   return res.status(400).json({
    error: "Name, age and department are required"
   });
  }

  const students = readStudents();

  const newStudent = {
   id: students.length ? students[students.length - 1].id + 1 : 1,
   name,
   age,
   department
  };

  students.push(newStudent);
  writeStudents(students);

  res.status(201).json({
   message: "Student added successfully",
   student: newStudent
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to add student"
  });
 }
});

// UPDATE student
app.put('/students/:id', (req, res) => {
 try {

  const students = readStudents();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
   return res.status(404).json({ error: "Student not found" });
  }

  const { name, age, department } = req.body;

  if (name) student.name = name;
  if (age) student.age = age;
  if (department) student.department = department;

  writeStudents(students);

  res.json({
   message: "Student updated successfully",
   student
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to update student"
  });
 }
});

// DELETE student
app.delete('/students/:id', (req, res) => {
 try {

  const students = readStudents();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
   return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  writeStudents(students);

  res.json({
   message: "Student deleted successfully",
   deleted: deletedStudent
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to delete student"
  });
 }
});

app.listen(4004, () => {
 console.log("Student Service running on port 4004");
});