const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/testing2', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Increase the timeout to 5 seconds
})

const db = mongoose.connection;

db.on("error", function (err) {
    console.log(err)
})

db.on("open", function () {
    console.log("connected with db")
})

module.exports = db;