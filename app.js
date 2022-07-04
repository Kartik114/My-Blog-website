//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Welcome to  my first Blog website .I Hope you will love this. This contains various sections like About info page , Contact me page and Home page respectively. Also user can compose various Blogs via compose button .Click below button to compose your own Blog 😊.";
const aboutContent = "I am currently undergraduate at IIIT Allahabad. I am in Fifth Semester and currently having 8.92 Aggregate CGPA. I am Passionate about Programming and Problem solving with Interest in Problem solving and Web-developement.";
const contactContent = "Hey 😊 , You can Contact with me via following :";

const app = express();
let posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://kartik:Test123@cluster0.wlthrzt.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);



app.get("/", function(req, res){
  Post.find({},function(err,posts){

    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });

  });

});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){

  if(!err)

  res.redirect("/");

  });



});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {cContent: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
