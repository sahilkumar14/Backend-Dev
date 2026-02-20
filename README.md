# Employee Payroll

A Node.js + Express payroll management app with separate **Admin** and **Employee** flows, EJS-rendered pages, and JSON file storage.

## Tech Stack
- Node.js (ES modules)
- Express 5
- EJS templates
- Joi validation
- bcrypt password hashing
- JSON Web Token (for API login responses)
- File-based persistence (`Employee.json`, `Admin.json`)

## Project Structure
```text
employee_payroll/
  Backend-Dev/
    index.js                      # App entry point
    package.json
    Employee.json                 # Employee records
    Admin.json                    # Admin records
    employee/
      router/app.route.js         # API/form action routes
      model/                      # JSON data access logic
      service/                    # Business logic
      middleware/                 # Joi request validation
      auth/                       # JWT auth helpers (for token-based APIs)
      views/                      # EJS pages
      public/style.css            # Static assets
```

## Features
- Admin and employee signup/login
- Session-based authentication for web pages (`sid` cookie + in-memory session map)
- JWT token returned for JSON login requests
- Admin can view, add, update, and delete employees
- Employee can view and update own profile

## Prerequisites
- Node.js 18+
- npm 9+

## Dependencies (Required)
These are required by the project and already declared in `Backend-Dev/package.json`:

- `bcrypt@^6.0.0`
- `cors@^2.8.6`
- `dotenv@^17.3.1`
- `ejs@^4.0.1`
- `express@^5.2.1`
- `helmet@^8.1.0`
- `http-status-pro-js@^1.0.2`
- `joi@^18.0.2`
- `jsonwebtoken@^9.0.3`
- `nodemon@^3.1.11`

## Installation
From the project root:

```bash
cd Backend-Dev
npm install
```

This installs all required dependencies from `package.json` and `package-lock.json`.

If you want to install dependencies manually one-by-one:

```bash
npm install bcrypt cors dotenv ejs express helmet http-status-pro-js joi jsonwebtoken nodemon
```

## Environment Variables
Create `Backend-Dev/.env`:

```env
PORT=8000
TOKEN=your_jwt_secret_here
```

- `PORT` is optional (defaults to `8000`)
- `TOKEN` is required for JWT generation in API login responses

## Run the App
```bash
cd Backend-Dev
nodemon index.js
```

Server starts at: `http://localhost:8000`

## Web Routes (Pages)
- `GET /` -> redirects to `/employee/login` or `/home` (if logged in)
- `GET /home` -> dashboard
- `GET /employee/login`
- `GET /admin/login`
- `GET /employee/signup`
- `GET /admin/signup`
- `GET /employee/add` (admin only)
- `GET /employee/edit/:id` (owner/admin)
- `POST /logout`

## Action/API Routes
### Employee
- `POST /employee/signup`
- `POST /employee/login`
- `POST /employee/update` (requires session)
- `POST /employee/delete/:id` (admin only)

### Admin
- `POST /admin/signup`
- `POST /admin/login`
- `PATCH /admin/update` (admin only)
- `DELETE /admin/delete/:id` (admin only)

## Validation Notes
- Employee/Admin passwords: alphanumeric, length `4-6`
- Admin email must end with `@admin.com`
- Employee signup requires: `name`, `email`, `password`, `department`, `basic_salary`

## Data Storage
This project uses flat JSON files for persistence:
- `Employee.json`
- `Admin.json`

No external database is required.

## Current Limitations
- Sessions are stored in memory (`Map`), so all active sessions are lost on server restart.
- JSON files are used as datastore; no concurrency controls.
- `admin.update` service currently reads/writes `admin.json` (lowercase) while other modules use `Admin.json`.

## License
ISC
