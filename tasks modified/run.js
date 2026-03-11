const { spawn } = require('child_process');

const services = [
  'teacher-service/app.js',
  'subject-service/app.js',
  'department-service/app.js',
  'student-service/app.js',
  'education-management-api/app.js'
];

services.forEach(service => {
  const process = spawn('node', [service], { stdio: 'inherit', shell: true });

  process.on('close', code => {
    console.log(`${service} stopped with code ${code}`);
  });
});