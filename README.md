# SmartOps – Project & Task Management System

## Overview

SmartOps is a full-stack web application designed to manage teams, projects, and tasks in a structured way.
It allows users to create teams, assign projects, manage tasks, and track activities across the system.

The goal of this project is to simulate a real-world workflow used in companies for project management.

---

## Features

### 1. Authentication & Security

* User registration and login
* JWT-based authentication
* Secure API access using tokens

### 2. Role-Based Access Control

* Roles: ADMIN, MANAGER, USER
* Different permissions based on role
* Backend security using Spring Security
* Frontend UI control based on role

### 3. Team Management

* Create teams
* View all teams
* Assign teams to projects

### 4. Project Management

* Create projects under teams
* Set project status (PLANNED, IN_PROGRESS, COMPLETED)
* Add deadlines

### 5. Task Management

* Create tasks under projects
* Assign tasks to users
* Set priority and deadline
* Update task status (TODO → IN_PROGRESS → DONE)

### 6. Activity Logging (Key Feature)

* Tracks important actions like:

  * Team creation
  * Project creation
  * Task creation
  * Task updates
* Helps in monitoring system activity and debugging

---

## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios (API integration)

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Hibernate / JPA

### Database

* MySQL

---

## Project Structure

```
smartOps/
│
├── frontend/
│   └── MyPortal/ (React app)
│
├── backend/
│   └── Spring Boot application
│
└── README.md
```

---

## API Overview

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Teams

* GET `/api/teams`
* POST `/api/teams`

### Projects

* GET `/api/projects`
* POST `/api/projects`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PATCH `/api/tasks/{id}/status`

### Logs

* GET `/api/logs`

---

## How to Run Locally

### Backend

1. Open backend folder in IDE
2. Configure database in `application.properties`
3. Run Spring Boot application

### Frontend

```bash
cd frontend/MyPortal
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Testing the Application

1. Register a new user
2. Login to get access
3. Create a Team
4. Create a Project under that team
5. Create Tasks under the project
6. Update task status
7. Check activity logs

---

## Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Uses cloud database

(Add your live links here)

---

## Key Highlights

* Full-stack application (React + Spring Boot)
* Secure authentication using JWT
* Role-based access implementation
* Activity logging system for tracking actions
* Clean API design and modular structure

---

## Future Improvements

* Add notifications
* Add file upload support
* Improve UI/UX
* Add dashboard analytics

---

## Author

Tushar Shendkar
Java Full Stack Developer
Pune, India

---
