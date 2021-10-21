const express = require("express");
const fs = require("fs");
const path = require("path")
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require("./db.json");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db.json"), (err,data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    })
});

app.post("/api/notes", (req,res) => {
    fs.readFile(path.join(__dirname, "./db.json"), (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuid.v4();
      notes.push(newNote);

      const createNote = JSON.stringify(notes);
      fs.writeFile(path.join(__dirname, "./db.json"), createNote, (err) => {
        if (err) throw err;
      });
      res.json(newNote);
    });
});

app.listen(PORT, () =>
console.log("App listening at http://localhost:${PORT}")
);