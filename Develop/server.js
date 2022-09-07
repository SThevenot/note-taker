/** @format */
const fs = require("fs");
const express = require("express");
const path = require("path");
const notes = require("./db/db.json");

const PORT = 3001;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/notes", (req, res) => {
  res.json("./db/db.json");
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function saveNewNote(text, noteArr) {
  const saveNote = text;
  if (!Array.isArray(noteArr)) noteArr = [];
  if (noteArr.length === 0) noteArr.push(0);

  text.id = noteArr[0];
  noteArr[0]++;

  noteArr.push(saveNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(noteArr, null, 2)
  );
  return saveNote;
}

app.post("/api/notes", (req, res) => {
  const saveNote = saveNewNote(req.body, notes);
  res.json(saveNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
