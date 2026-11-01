
# Skill Swap — Unit 9

Full-stack Skill Swap application using HTML, CSS,
JavaScript, Express.js, Sequelize, and SQLite.

## Backend

Backend repository:
https://github.com/RizeComputerScience/COMPSIX-skill-swap-backend

1. Clone the backend repository.
2. Run npm install.
3. Create a .env file containing:

   DB_STORAGE=./database.sqlite
   PORT=3001

4. Run npm run setup.
5. Run npm start.

API: http://localhost:3001/api/skills

## Frontend

Open index.html using VS Code Live Server.

Keep the backend running while using the frontend.

## Features

- Load skills from the backend API
- Filter skills by category
- Calculate total costs
- Match skills to user interests
- Add new skills to the database
- Persist skills after refreshing

## Tests

Run npm install and npm test.

Three Jest tests cover the required functions.
