
const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

router.get('/teachers', teacherController.getTeachers);
router.post('/teachers', teacherController.addTeacher);

module.exports = router;
