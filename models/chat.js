const mongoose = require('mongoose')



const messagesSchema = mongoose.Schema({
    messages: String,
})

module.exports = mongoose.model("messages",messagesSchema)