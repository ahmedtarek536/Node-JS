const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

const Article = mongooes.model("Article", articleSchema);

module.exports = Article;
