# gohilneel-campusbite-backend-pg-

This Folder containes the files for student registration task.
The node.js application is running on port 3000.

To run the appllication clone this repo in your local machine and run the command npm start in terminal.

The server.js Contain following API endpints.
GET - http:/localhost:3000/api/students
GET - http:/localhost:3000/api/students/:id
POST - http:/localhost:3000/api/students/
PUT - http:/localhost:3000/api/students/:id
DELETE - http:/localhost:3000/api/students/:id

-JSON file info..
In the file ./data/student.json/ the data of student will be there.
The CRUD operation will be done on that json file.

--JSON confing rules..
The ./JSONConfig/studentConfing.json/ file defines the rules of the insertions.
The server.js validates that rules in while inserting the data.

-Insetion guidelines..
ID is Auto generated while inserting the data so there is no need of sending the ID while inserting
Following are the key:value example to send the JSON data while testing the API.
    (You also need the send the image in as a file[multi/part] to complete the insertion.)

studentName:Jenish Jadav
enrollmentNo:MSCIT003
email:jenish@example.com
mobile:7894561235
dateOfBirth:2000-01-03
age:20
gender:Male
course:MSc IT
specialization:Backend
semester:6
skills:.NET CORE, PHP
hobbies:Coding, Traveling
address:123 ABC
city:Suarat
state:gujrat





