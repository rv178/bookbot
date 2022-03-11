const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    User : String, // user id
    Genre: String, // fav genre
    Read: Array, // array of books read
})

module.exports = mongoose.model('profile', Schema)