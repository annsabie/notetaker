const express = require("express");
const path = require("path");

const PORT = 3001;

const app = express()

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes/html"));
  });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/api/notes", (req, res) => {
    res.json()
})

app.post("/api/notes", (req,res) => {
  
})