var express = require("express");
const User = require("../models/user");
var router = express.Router();
/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(__dirname.slice(0,-7)+'/dist/index.html');
});
router.get("/todoapp",async function(req,res){
  const {refreshtoken} = req.cookies;
  const user = await User.findOne({refreshtoken})
  return res.status(200).json(
    user.projects)
})
router.post("/todoapp",async function(req,res){
  try{
    const {refreshtoken} = req.cookies;
    const {projects} = req.body
    const user = await User.findOne({refreshtoken})
    user.projects = projects
    await user.save()
    return res.status(200).json({
      message : "changes saved successfully",
      type: "success",
      projects
    })
  }catch {
    return res.status(500).json({
      message : "error saving changes",
      type : "error"
    })
  }
})
module.exports = router;
