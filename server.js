const express = require("express");
const ejs = require("ejs");

const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

app.get("/404", (req, res) => {
  res.sendFile(path.join(initial_path, "404.html"));
});

app.get("/about", (req, res) => {
  let allMessages = [];
  if (typeof localStorage !== "undefined" && localStorage.getItem("messages")) {
    allMessages = JSON.parse(localStorage.getItem("messages"));
  }
  res.render("about.ejs", { allMessages });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});

app.get("/catFact", (req, res) => {
  const catFacts = [
    "Cats sleep for 70% of their lives.",
    "Cats have five toes on their front paws, but only four on their back paws.",
    "The world's largest cat measured 48.5 inches long.",
    "Cats can rotate their ears 180 degrees.",
    "The average cat can jump five times its own height in a single leap.",
  ];
  // Select a random cat fact
  const randomIndex = Math.floor(Math.random() * catFacts.length);
  const fact = catFacts[randomIndex];
  res.json({ fact });
});

app.get("/editor", (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(initial_path, "dashboard.html"));
});

app.post("/upload", (req, res) => {
  let file = req.files.image;
  let date = new Date();

  let imagename = date.getDate() + date.getTime() + file.name;

  let path = "public/uploads/" + imagename;

  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(`uploads/${imagename}`);
    }
  });
});

app.get("/:blog", (req, res) => {
  res.sendFile(path.join(initial_path, "blog.html"));
});

app.get("/:blog/editor", (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

app.use((req, res) => {
  res.json("404");
});
const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log("Listening to the app");
});
