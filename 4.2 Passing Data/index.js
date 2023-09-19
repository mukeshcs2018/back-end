import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fullName = req.body["fName"] + " " + req.body["lName"];
  
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  res.render("./index.ejs", {
    fullName: fullName,
    numberOfLetters: numLetters,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
