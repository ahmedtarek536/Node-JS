//mongodb+srv://ahmedtarek3182004:<db_password>@nodejs.qis7e.mongodb.net/?retryWrites=true&w=majority&appName=nodeJS
const express = require("express");
const mongooes = require("mongoose");
const app = express();
app.use(express.json());

const Article = require("./models/Article");

mongooes
  .connect(
    "mongodb+srv://ahmedtarek3182004:A3182004a@nodejs.qis7e.mongodb.net/?retryWrites=true&w=majority&appName=nodeJS"
  )
  .then(() => {
    console.log("connect successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  let number = [];
  for (let i = 0; i <= 100; i++) {
    number.push(i);
  }
  res.send(number);
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/html", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + " - ";
  }
  //   res.send("<h1>Hello </h1>");
  //   res.sendFile(__dirname + "/views/numbers.ejs");
  res.render("numbers.ejs", {
    name: "Ahmed",
  });
});

app.post("/addcomment", (req, res) => {
  res.send("post requrest on add comment");
});

app.delete("/deletcomment", (req, res) => {
  res.send("removing comment");
});

// path
// http://localhost:3000/sum/50/20
app.get("/sum/:num1/:num2", (req, res) => {
  console.log(req.params);
  const { num1, num2 } = req.params;
  res.send(`sum: ${+num1 + +num2}`);
});

// body
// add data in body
app.get("/sayhello", (req, res) => {
  const name = req.body.name;
  //   res.send(`hello, ${name}`);
  res.json({
    name: name,
    language: "Arabic",
  });
});

// query
// http://localhost:3000/query?age=50
app.get("/query", (req, res) => {
  const age = req.query.age;
  res.send(`your are is: ${age}`);
});

app.post("/articles", async (req, res) => {
  const { title, body } = req.body;
  const newArticle = new Article();
  newArticle.title = title;
  newArticle.body = body;
  newArticle.numberOfLikes = 0;
  await newArticle.save();
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const data = await Article.find();
  res.json(data);
});

app.get("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Article.findById(id);
    res.json(data);
    return;
  } catch (err) {
    res.send("erorr");
  }
});

app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Article.findByIdAndDelete(id);
    res.json(data);
    return;
  } catch (err) {
    res.send("erorr");
  }
});

app.listen(3000 || process.env.PORT, () => {
  console.log("I am listening in port 3000");
});
