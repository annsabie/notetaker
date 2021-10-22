const express = require("express");
const fs = require("fs");
const allNotes = require("../db/db.json");

module.exports = function (app) {

app.get("/api/notes", function(req, res) {
    res.json(allNotes);
});

function writeNotes(notes) {
    notes = JSON.stringify(notes);
    fs.writeFileSync("./db.json", notes, function(err) {
        if (err) {
            return err;
        }
    })
};

app.post("/api/notes", function(req,res) {
    req.body.id = JSON.stringify
    allNotes.push(req.body);

writeNotes(allNotes);

res.json(req.body);
});

};