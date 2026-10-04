# Campus Bite Backend - Student Registration

This folder contains the files for the student registration task.
The Node.js application runs on port 3000.

## Run the application

1. Clone the repository to your local machine.
2. Open a terminal in the project folder.
3. Run:

```bash
npm run
```

## API endpoints

The `server.js` file contains the following API endpoints:

- `GET http://localhost:3000/api/students`
- `GET http://localhost:3000/api/students/:id`
- `POST http://localhost:3000/api/students/`
- `PUT http://localhost:3000/api/students/:id`
- `DELETE http://localhost:3000/api/students/:id`

## JSON data storage

The student data is stored in:

- `./data/student.json`

All CRUD operations are performed on this JSON file.

## JSON validation rules

The validation rules for student insertion are defined in:

- `./JSONConfig/studentConfig.json`

The server validates these rules before inserting data.

## Insertion guidelines

- The `id` is auto-generated when inserting a student, so you do not need to send it in the request body.
- While testing the API, send the student details in JSON format.
- You also need to upload the image as a multipart file to complete the insertion.

### Example request payload

```json
{
  "studentName": "Jenish Jadav",
  "enrollmentNo": "MSCIT003",
  "email": "jenish@example.com",
  "mobile": "7894561235",
  "dateOfBirth": "2000-01-03",
  "age": 20,
  "gender": "Male",
  "course": "MSc IT",
  "specialization": "Backend",
  "semester": 6,
  "skills": ".NET CORE, PHP",
  "hobbies": "Coding, Traveling",
  "address": "123 ABC",
  "city": "Surat",
  "state": "Gujarat"
}
```


