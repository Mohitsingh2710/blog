const mongoose=require("mongoose");
const express = require('express');
var bodyParser = require('body-parser')
const ArticleRouter=require("./routes/article");
const Article=require('./models/article');
const methodOverride=require('method-override');
const app = express()
const port = 3000

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogarticle?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0'); 
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