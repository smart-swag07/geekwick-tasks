
const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');

router.get('/subjects', subjectController.getSubjects);
router.post('/subjects', subjectController.addSubject);

module.exports = router;
