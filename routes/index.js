var express = require("express");
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/index.html');
});
router.get("/todo", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/todo.html');
});
// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
