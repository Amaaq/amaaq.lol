var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  req.headers["content-type"] = ''
  res.sendFile(__dirname.slice(0,-7)+'/dist/index.html');
});
// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
