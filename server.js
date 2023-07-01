const mongoose=require("mongoose");
const express = require('express');
var bodyParser = require('body-parser')
const ArticleRouter=require("./routes/article");
const Article=require('./models/article');
const methodOverride=require('method-override');
require('dotenv').config();
const app = express()
const port = 3000
const URL=process.env.MONGO_CONNECTION_URL;
main().catch(err => console.log(err));

console.log(URL);

async function main() {
  await mongoose.connect(URL); 
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(
 bodyParser.urlencoded({
  extended: true
 }));
 app.use(methodOverride("_method"));

app.get('/',async (req, res) => {
  const articles=await Article.find().sort({ createdAt: 'desc' });
    res.render("articles/index",{articles: articles});
});

app.use('/articles',ArticleRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});