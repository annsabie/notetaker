const express = require("express");
const jsonData = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

let storedData = jsonData;  

const PORT = process.env.PORT || 3000;  
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get('/api/notes', (req, res) => {
  fs.readFile("./db/db.json")
  res.status(200).json(storedData);
});

app.post('/api/notes', (req, res) => {
  let notesData = req.body;
  notesData.id = uuidv4();

  storedData.push(notesData);

  fs.writeFile('./db/db.json', JSON.stringify(storedData), (err) =>{
    err ? console.error(err) : console.log('Success!')}
  )

  res.status(201).json(storedData)
});

// Tell express to start listening!
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);