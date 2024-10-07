const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    age: Number,
})
module.exports = mongoose.model("user", userSchema)