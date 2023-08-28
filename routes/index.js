var express = require("express");
var router = express.Router();
var path = require('path')
const { protected } = require("../utils/protected");

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/index.html');
});
router.get("/todo",protected, function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/todo.html');
});
router.post("/todo",protected, function(req,res){
  try {
    req.user.projects = "112212332"
    return res.status(200)
  } catch {
    return res.status(500).json({
      error: 'error'
    })
  }
})
// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
