var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html', { root: 'public' });
});

module.exports = router;


router.get('/comments', function(req, res, next) {
  console.log("In the get the comments area!");

  //TODO get latest 50 comments from the database
  //right now we return all of the comments in the database
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  })
});

//this will add a comment to the database
router.post('/comments', function(req, res, next) {
  console.log("in the comment posting area!");
  console.log(req.body);
  var commentToAdd = new Comment(req.body);
  commentToAdd.save(function(err, comment){
    if(err){
      return next(err);
    }
   // res.json(comment);
    res.sendStatus(200);
  })
});
