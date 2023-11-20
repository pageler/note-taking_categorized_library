const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const notes = require("./data/notes");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Note Taking Categorize Library API is listening of PORT 5000");
});
app.get("/api/notes", (req, res) => {
    res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((note) => note._id === req.params.id);
    res.send(note);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server listening on PORT ${PORT}...`.blue));
