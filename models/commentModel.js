var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    favScripture: String,
    date: {type: Date, default: Date.now}
});

mongoose.model('Comment', CommentSchema);