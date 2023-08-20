var express = require("express");
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname+'../dist/index.html');
});
// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
