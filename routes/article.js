const express = require('express');
const Article=require('../models/article');
const router=express.Router();

router.post("/",async (req,res)=>{
     req.article=new Article();
     let article= req.article;
     article.title=req.body.title;
     article.description=req.body.description;
     article.markdown=req.body.markdown;

     try {
        await article.save();
        res.redirect(`/articles/show/${article.id}`);
     } catch (error) {
        res.render('articles/new',{article:article});
     }
});

router.get("/edit/:id",async(req,res)=>{
    console.log(req.params.id);
    let article=await Article.findById(req.params.id);
    if (article == null) res.redirect('/');
    res.render("articles/edit",{article:article});
})

router.get("/new",async (req,res)=>{
   try {
      let article=new Article();
      res.render('articles/new',{article:article});
   } catch (error) {
      console.log("Yohi h bc",error);
   }
});

router.get("/show/:id",async(req,res)=>{

   try {
      console.log("id",req.params.id);
      let article=await Article.findById(req.params.id);
      console.log("article",article);
      if (article == null) res.redirect('/');
      res.render('articles/show', { article: article});
   } catch (error) {
      console.log(error);
   }
   
});

router.put("/:id",async(req,res)=>{
    req.article= await Article.findById(req.params.id);
    let article=req.article;
    article.title=req.body.title;
    article.description=req.body.description;
    article.markdown=req.body.markdown;

    try {
       await article.save();
       res.redirect(`/articles/show/${article.id}`);
    } catch (error) {
       res.render('articles/edit',{article:article});
    }
});

router.delete("/:id",async(req,res)=>{
  await Article.findByIdAndRemove(req.params.id);
  res.redirect('/');
})


module.exports = router;