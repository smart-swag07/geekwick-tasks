const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const filePath = './teachers.json';

// Read teachers
function readTeachers() {
 try {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
 } catch (error) {
  return [];
 }
}

// Write teachers
function writeTeachers(data) {
 fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all teachers
app.get('/teachers', (req, res) => {
 try {
  const teachers = readTeachers();
  res.json(teachers);
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch teachers" });
 }
});

// GET teacher by ID
app.get('/teachers/:id', (req, res) => {
 try {
  const teachers = readTeachers();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const teacher = teachers.find(t => t.id === id);

  if (!teacher) {
   return res.status(404).json({ error: "Teacher not found" });
  }

  res.json(teacher);

 } catch (error) {
  res.status(500).json({ error: "Server error while fetching teacher" });
 }
});

// ADD teacher
app.post('/teachers', (req, res) => {
 try {

  const { name, subject } = req.body;

  if (!name || !subject) {
   return res.status(400).json({
    error: "Name and subject are required"
   });
  }

  const teachers = readTeachers();

  const newTeacher = {
   id: teachers.length ? teachers[teachers.length - 1].id + 1 : 1,
   name,
   subject
  };

  teachers.push(newTeacher);
  writeTeachers(teachers);

  res.status(201).json({
   message: "Teacher added successfully",
   teacher: newTeacher
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to add teacher"
  });
 }
});

// UPDATE teacher
app.put('/teachers/:id', (req, res) => {
 try {

  const teachers = readTeachers();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const teacher = teachers.find(t => t.id === id);

  if (!teacher) {
   return res.status(404).json({ error: "Teacher not found" });
  }

  const { name, subject } = req.body;

  if (name) teacher.name = name;
  if (subject) teacher.subject = subject;

  writeTeachers(teachers);

  res.json({
   message: "Teacher updated successfully",
   teacher
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to update teacher"
  });
 }
});

// DELETE teacher
app.delete('/teachers/:id', (req, res) => {
 try {

  const teachers = readTeachers();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = teachers.findIndex(t => t.id === id);

  if (index === -1) {
   return res.status(404).json({ error: "Teacher not found" });
  }

  const deletedTeacher = teachers.splice(index, 1);

  writeTeachers(teachers);

  res.json({
   message: "Teacher deleted successfully",
   deleted: deletedTeacher
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to delete teacher"
  });
 }
});

app.listen(4001, () => {
 console.log("Teacher Service running on port 4001");
});