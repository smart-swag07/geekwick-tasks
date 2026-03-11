
const express = require('express');
const app = express();

const teacherRoutes = require('./routes/teacherRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

app.use(express.json());

app.use('/', teacherRoutes);
app.use('/', subjectRoutes);

app.listen(6000, ()=>{
 console.log("Education API running on port 6000");
});
