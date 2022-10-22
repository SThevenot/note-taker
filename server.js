/** @format */
const PORT = 3001;
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const notesjson = require("./Develop/db/db.json");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//get
app.get("/api/notes", (req, res) => {
  res.json(notesjson.slice(1));
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

function createNote(body, noteArr) {
  const newNote = body;
  if (!Array.isArray(noteArr)){
     noteArr = [];
  }
  if (noteArr.length === 0) {
  noteArr.push(0);
  }

  body.id = noteArr[0];
  noteArr[0]++;

  noteArr.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(noteArr, null, 2)
  );
  return newNote;
}

app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, notesjson);
  res.json(newNote);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
