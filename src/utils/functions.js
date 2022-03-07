const { setup } = require("axios-cache-adapter");

async function getVolInfo(book) {
	const api = setup({
		baseURL: "https://www.googleapis.com/books/v1",
		cache: {
			maxAge: 15 * 60 * 1000,
			exclude: { query: false },
		},
	});

	const bookInfo = await api
		.get(`/volumes?q=${book}`)
		.catch(function (error) {
			return interaction.followUp({
				content: `No books found. Error: ${error}`,
			});
		});

	return bookInfo;
}

async function bookDesc(book) {
	const bookInfo = await getVolInfo(book);
	let bookDescription;
	const bookDescriptionData = bookInfo.data.items[0].volumeInfo.description;

	if (bookDescriptionData === undefined) {
		return (bookDescription = "No description available.");
	} else {
		return (bookDescription = bookDescriptionData);
	}
}

module.exports = {
	bookDesc,
	getVolInfo,
};
