import mongoose from "mongoose";

const Schema = new mongoose.Schema({
	User: String, // user id
	Genre: String, // fav genre
	Starred: Array, // array of books starred
});

export default mongoose.model("profile", Schema);
