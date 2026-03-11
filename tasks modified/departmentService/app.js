const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const filePath = path.join(__dirname, 'departments.json');

// read departments
function readDepartments() {
 try {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
 } catch (error) {
  return [];
 }
}

// write departments
function writeDepartments(data) {
 fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all departments
app.get('/departments', (req, res) => {
 try {
  const departments = readDepartments();
  res.json(departments);
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch departments" });
 }
});

// GET department by ID
app.get('/departments/:id', (req, res) => {
 try {
  const departments = readDepartments();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const department = departments.find(d => d.id === id);

  if (!department) {
   return res.status(404).json({ error: "Department not found" });
  }

  res.json(department);

 } catch (error) {
  res.status(500).json({ error: "Server error while fetching department" });
 }
});

// ADD department
app.post('/departments', (req, res) => {
 try {

  const { name, block } = req.body;

  if (!name || !block) {
   return res.status(400).json({
    error: "Name and block are required"
   });
  }

  const departments = readDepartments();

  const newDepartment = {
   id: departments.length ? departments[departments.length - 1].id + 1 : 1,
   name,
   block
  };

  departments.push(newDepartment);
  writeDepartments(departments);

  res.status(201).json({
   message: "Department added successfully",
   department: newDepartment
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to add department"
  });
 }
});

// UPDATE department
app.put('/departments/:id', (req, res) => {
 try {

  const departments = readDepartments();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const department = departments.find(d => d.id === id);

  if (!department) {
   return res.status(404).json({ error: "Department not found" });
  }

  const { name, block } = req.body;

  if (name) department.name = name;
  if (block) department.block = block;

  writeDepartments(departments);

  res.json({
   message: "Department updated successfully",
   department
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to update department"
  });
 }
});

// DELETE department
app.delete('/departments/:id', (req, res) => {
 try {

  const departments = readDepartments();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = departments.findIndex(d => d.id === id);

  if (index === -1) {
   return res.status(404).json({ error: "Department not found" });
  }

  const deletedDepartment = departments.splice(index, 1);

  writeDepartments(departments);

  res.json({
   message: "Department deleted successfully",
   deleted: deletedDepartment
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to delete department"
  });
 }
});

app.listen(4003, () => {
 console.log("Department Service running on port 4003");
});