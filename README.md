# Education Microservices Project

This project is a **Node.js Microservices-based Education Management System** developed as part of my internship training.
The system is divided into multiple independent services that handle different parts of an education system such as **Students, Teachers, Subjects, and Departments**.

Each service runs on a separate port and communicates through REST APIs.

---

## Project Structure

```
education-microservices
│
├── teacher-service
│   ├── app.js
│   └── teachers.json
│
├── subject-service
│   ├── app.js
│   └── subjects.json
│
├── department-service
│   ├── app.js
│   └── departments.json
│
├── student-service
│   ├── app.js
│   └── students.json
│
├── education-management-api
│   └── app.js
│
└── run.js
```

---

## Technologies Used

* Node.js
* Express.js
* REST APIs
* JSON File Storage
* Microservices Architecture

---

## Services and Ports

| Service            | Port |
| ------------------ | ---- |
| Teacher Service    | 4001 |
| Subject Service    | 4002 |
| Department Service | 4003 |
| Student Service    | 4004 |
| API Gateway        | 3000 |

---

## How to Run the Project

### Install Dependencies

Install express inside each service folder.

```
npm install express
```

For API gateway:

```
npm install express axios
```

---

### Run All Services

From the main project folder:

```
node run.js
```

This will start all microservices together.

---

## API Endpoints

### Students

GET all students

```
GET http://localhost:4004/students
```

Add student

```
POST http://localhost:4004/students
```

Example Body:

```
{
 "name": "Arjun",
 "age": 22,
 "department": "Computer Science"
}
```

---

### Teachers

```
GET http://localhost:4001/teachers
POST http://localhost:4001/teachers
```

---

### Subjects

```
GET http://localhost:4002/subjects
POST http://localhost:4002/subjects
```

---

### Departments

```
GET http://localhost:4003/departments
POST http://localhost:4003/departments
```

---

## Features

* Microservices architecture
* REST API implementation
* CRUD operations
* JSON file data storage
* Modular backend services
* API gateway for centralized access

---

## Learning Outcomes

Through this project, I learned how to design and implement a **microservices architecture using Node.js and Express**, create REST APIs for different services, manage data using JSON files, and organize backend systems into modular services.

---

## Author

Shamanth M
Intern
Geekwick TechMedia Services

---

✅ After creating the README:

1. Save it as **`README.md`** in your project root.
2. Push it to GitHub:

```bash
git add README.md
git commit -m "Added project README"
git push origin main

