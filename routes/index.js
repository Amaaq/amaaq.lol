var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/index.html');
});

module.exports = router;
