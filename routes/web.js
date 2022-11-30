var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/chatMessages", (req, res, next) => {
  res.render("chat");
});
// router.get("/messages", (req, res, next) => {
//   res.render("js/main");
// });


module.exports = router;
