
const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ message: "Example API endpoint" });
});

// TODO (step1): implement GET /api/stories endpoint
const story1 = {
  _id: "id1",
  creator_name: "Stanley Zhao",
  content: "Hi everyone",
};
const story2 = {
  _id: "id2",
  creator_name: "Abby Chou",
  content: "Web.lab rocks",
};
const story3 = {
  _id: "id3",
  creator_name: "Andy Jiang",
  content: "I like cats",
};
const stories = [story1, story2, story3];

router.get("/stories", (req, res) => {
  res.send(stories);
});

// TODO (step2): implement POST /api/story endpoint

router.post("/story", (req, res) => {
  const newStory = req.body;
  stories.push(newStory);
  res.send(newStory);
})

// TODO (step3): implement GET /api/comments endpoint

const comment1 = {
  _id: "commentid1",
  creator_name: "Daniel Hong",
  parent: "id1",
  content: "Hi Stanley",
};
const comment2 = {
  _id: "commentid2",
  creator_name: "Lucas Bautista",
  parent: "id2",
  content: "I agree!",
};
const comment3 = {
  _id: "commentid3",
  creator_name: "Stanley Zhao",
  parent: "id1",
  content: "Hi Daniel",
};
const comments = [comment1, comment2, comment3];

router.get("/comments", (req, res) => {
  res.send(comments.filter((comment) => comment.parent === req.query.parent));
});

// TODO (step4): implement POST /api/comment endpoint

router.post("/comment", (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.send(newComment);
});

module.exports = router;