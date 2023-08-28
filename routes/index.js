var express = require("express");
var router = express.Router();
const User = require('../models/user');
var path = require('path')
const { protected } = require("../utils/protected");
const {verify} = require("jsonwebtoken")

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/index.html');
});
router.get("/todo",protected, function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/todo.html');
});
router.post("/todo",protected, async function(req,res){
    try {
      const {accesstoken} = req.cookies;
      if(!accesstoken)
          return res.status(500).json({
              message:"No access token!",
              type: "error"
          });
      let id;
      try {
          id = verify(accesstoken,process.env.ACCESS_TOKEN_SECRET).id;
      }catch (error){
          return res.status(500).json({
              message: "Invalid access token!",
              type: "error"
          })
      }
      if (!id)
          return res.status(500).json({
              message: "Invalid access token! 🤔",
              type: "error",
          });
      // if the refresh token is valid, check if the user exists
      const user = await User.findById(id);
      // if the user doesn't exist, return error
      if (!user)
          return res.status(500).json({
              message: "User doesn't exist! 😢",
              type: "error",
          });
      // if the user exists, check if the refresh token is correct. return error if it is incorrect.
      // if the refresh token is correct, create the new tokens
      // update the refresh token in the database
      user.projects = 'projects';
      await user.save()
      // send the new tokes as response
          return res.json({
          message: "Refreshed successfully! 🤗",
          type: "success",
          user
          });
  } catch (error) {
      res.status(500).json({
      type: "error",
      message: "Error refreshing token!",
      error,
      });
  }
})

// router.get("/style.css", function (req, res) {
//   res.sendFile(path.join(__dirname,'../','dist','/style.css'));
// });

module.exports = router;
