Todo Project

## Description
1. Editable project titles 
2. Todo list with descriptions, created/updated dates, and statuses (pending/completed)
3. CRUD actions for projects and todos 
4. Status updates without page reload

## Requirements
- Node.js version: 18.13.0
- npm version: 8.19.3
- Java version: 17
- Maven

## Setup Instructions

### Frontend
```bash
npm install
npm start

##Database
mysql -u root -p todo < src/database/todo_backup.sql
