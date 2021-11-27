const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const jsonData = require("./db/db.json");

let storedData = jsonData;

const app = express();
const PORT = process.env.PORT || 3000;

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
  return res.status(200).json(storedData)
});

app.post('/api/notes', (req, res) => {
  let notesData = req.body
  notesData.id = uuidv4()

  storedData.push(notesData)

  fs.writeFile('./db/db.json', JSON.stringify(storedData), (err) => {
    err ? console.error(err) : console.log('Success')}
  )

  res.status(200).json(storedData)
});

app.listen(PORT, () =>
  console.log(`Express server listening at http://localhost:${PORT}`)
);