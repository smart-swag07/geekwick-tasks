const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const filePath = path.join(__dirname, 'subjects.json');

// read subjects from file
function readSubjects() {
 try {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
 } catch (error) {
  return [];
 }
}

// write subjects to file
function writeSubjects(data) {
 fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all subjects
app.get('/subjects', (req, res) => {
 try {
  const subjects = readSubjects();
  res.json(subjects);
 } catch (error) {
  res.status(500).json({ error: "Failed to fetch subjects" });
 }
});

// GET subject by ID
app.get('/subjects/:id', (req, res) => {
 try {
  const subjects = readSubjects();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const subject = subjects.find(s => s.id === id);

  if (!subject) {
   return res.status(404).json({ error: "Subject not found" });
  }

  res.json(subject);

 } catch (error) {
  res.status(500).json({ error: "Server error while fetching subject" });
 }
});

// ADD subject
app.post('/subjects', (req, res) => {
 try {

  const { name, credits } = req.body;

  if (!name || !credits) {
   return res.status(400).json({
    error: "Name and credits are required"
   });
  }

  const subjects = readSubjects();

  const newSubject = {
   id: subjects.length ? subjects[subjects.length - 1].id + 1 : 1,
   name,
   credits
  };

  subjects.push(newSubject);
  writeSubjects(subjects);

  res.status(201).json({
   message: "Subject added successfully",
   subject: newSubject
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to add subject"
  });
 }
});

// UPDATE subject
app.put('/subjects/:id', (req, res) => {
 try {

  const subjects = readSubjects();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const subject = subjects.find(s => s.id === id);

  if (!subject) {
   return res.status(404).json({ error: "Subject not found" });
  }

  const { name, credits } = req.body;

  if (name) subject.name = name;
  if (credits) subject.credits = credits;

  writeSubjects(subjects);

  res.json({
   message: "Subject updated successfully",
   subject
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to update subject"
  });
 }
});

// DELETE subject
app.delete('/subjects/:id', (req, res) => {
 try {

  const subjects = readSubjects();
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
   return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = subjects.findIndex(s => s.id === id);

  if (index === -1) {
   return res.status(404).json({ error: "Subject not found" });
  }

  const deletedSubject = subjects.splice(index, 1);

  writeSubjects(subjects);

  res.json({
   message: "Subject deleted successfully",
   deleted: deletedSubject
  });

 } catch (error) {
  res.status(500).json({
   error: "Failed to delete subject"
  });
 }
});

app.listen(4002, () => {
 console.log("Subject Service running on port 4002");
});