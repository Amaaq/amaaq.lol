var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile('dist/index.html');
});
// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
