const axios = require("axios");

async function bookDesc(book) {
	let bookDescription = "";
	const bookInfo = await axios
		.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
		.catch(function (error) {
			console.log(error);
		});
	if (bookInfo.data.items[0].volumeInfo.description === undefined) {
		return (bookDescription = "No description available.");
	} else {
		return (bookDescription =
			bookInfo.data.items[0].volumeInfo.description);
	}
}

module.exports = {
	bookDesc,
};
