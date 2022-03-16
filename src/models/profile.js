const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
	User: String, // user id
	Genre: String, // fav genre
	Starred: Array, // array of books starred
});

module.exports = mongoose.model("profile", Schema);
