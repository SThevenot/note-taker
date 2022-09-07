/** @format */
const fs = require("fs");
const express = require("express");
const path = require("path");

const PORT = 3001;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.post("/notes", (req, res) => {
  let response;
  if (req.body && req.body.title) {
    response = {
      status: "success",
      data: req.body,
    };
    res.status(201).json(response);
    saveNoteBtn.style.display = "inline";
  } else {
    res.status(400).json("request body must have data");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
