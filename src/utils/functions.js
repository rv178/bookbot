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
async function bookAuthor(book) {
	const bookInfo = await getVolInfo(book);
	let bookAuthor;
	const bookAuthorData = bookInfo.data.items[0].volumeInfo.authors.join(", ");

	if (bookAuthorData === undefined) {
		return (bookAuthor = "No author available.");
	} else {
		return (bookAuthor = bookAuthorData[0]);
	}
}
async function bookTitle(book) {
	const bookInfo = await getVolInfo(book);
	let bookTitle;
	const bookTitleData = bookInfo.data.items[0].volumeInfo.title;
	return (bookTitle = bookTitleData);
}
async function bookLang(book) {
	const bookInfo = await getVolInfo(book);
	let bookLang;
	const bookLangData = bookInfo.data.items[0].volumeInfo.language;
	return (bookLang = bookLangData);

}
async function bookPub(book) {
	const bookInfo = await getVolInfo(book);
	let bookPub;
	const bookPubData = bookInfo.data.items[0].volumeInfo.publishedDate;
	return (bookPub = bookPubData);
}
async function bookImg(book) {
	const bookInfo = await getVolInfo(book);
	let bookImg;
	const bookImgData = bookInfo.data.items[0].volumeInfo.imageLinks.thumbnail;
	if (bookImgData === undefined) {
		return (bookImg = "https://cdn.discordapp.com/emojis/948892682032394240.png");
	} else {
		return (bookImg = bookImgData);
	}
}
async function bookLink(book) {
	const bookInfo = await getVolInfo(book);
	let bookLink;
	const bookLinkData = bookInfo.data.items[0].volumeInfo.infoLink;
	return (bookLink = bookLinkData);
}
async function bookPageCount(book) {
	const bookInfo = await getVolInfo(book);
	let bookPageCount;
	const bookPageCountData = bookInfo.data.items[0].volumeInfo.pageCount;
	return (bookPageCount = bookPageCountData.toString());
}

module.exports = {
	bookDesc,
	getVolInfo,
	bookAuthor,
	bookTitle,
	bookLang,
	bookPub,
	bookImg,
	bookLink,
	bookPageCount,
};
