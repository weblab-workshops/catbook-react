// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Story = require('../models/story');
const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/test', function(req, res) {
    res.send('quack');
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});


router.get('/user', function(req, res) {
    User.findOne({ _id: req.query._id }, function(err, user) {
        res.send(user);
    });
});

router.get('/stories', function(req, res) {
    Story.find({}, function(err, stories) {
        res.send(stories);
    });
});

router.post(
    '/story',
    connect.ensureLoggedIn(),
    function(req, res) {
        const newStory = new Story({
            'creator_id': req.user._id,
            'creator_name': req.user.name,
            'content': req.body.content,
        });
  
        newStory.save(function(err, story) {
            User.findOne({ _id: req.user._id },function(err, user) {
                user.last_post = req.body.content;
                user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
                // configure socketio
                const io = req.app.get('socketio');
                io.emit("post", { id: story.id, creator_name: user.name, content: req.body.content });
            });
            if (err) console.log(err);
        });
        res.send({});
  }
);

router.get('/comment', function(req, res) {
    Comment.find({ parent: req.query.parent }, function(err, comments) {
        res.send(comments);
    })
});

router.post(
    '/comment',
    connect.ensureLoggedIn(),
    function(req, res) {
        const newComment = new Comment({
            'creator_id': req.user._id,
            'creator_name': req.user.name,
            'parent': req.body.parent,
            'content': req.body.content,
        });

        newComment.save(function(err, comment) {
            // configure socket
            const io = req.app.get('socketio');
            io.emit("comment", { creator_name: req.user.name, parent: req.body.parent, content:req.body.content});
            if (err) console.log(err);
        });
        res.send({});
  }
);
module.exports = router;
