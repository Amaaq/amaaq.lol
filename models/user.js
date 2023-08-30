const {Schema, model} = require("mongoose")
const userSchema = new Schema({
    fname: {
        type : String,
        required: true,
    },
    lname: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    verified: {
        type : Boolean,
        default: false
    },
    refreshtoken: {
        type: String
    },
    projects: {
        type: String,
        default: ""
    }
})
module.exports = model("User", userSchema)