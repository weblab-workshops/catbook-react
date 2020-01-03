const express = require("express");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// an example GET route
router.get("/test", (req, res) => {
  res.send({ message: "it works" });
});

module.exports = router;
