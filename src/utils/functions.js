// TODO: cache response to avoid unneeded calls

const axios = require("axios");

async function getVolInfo(book) {
	const api = axios.create({
		baseURL: "https://www.googleapis.com/books/v1",
	});

	const bookInfo = await api
		.get(`/volumes?q=${book}`)
		.catch(function (error) {
			return interaction.followUp({
				content: `No books found. Error: ${error}`,
			});
		});
	console.log(bookInfo.request.fromCache === true);

	return bookInfo;
}

async function bookDesc(bookInfo) {
	let bookDescription;
	const bookDescriptionData = bookInfo.data.items[0].volumeInfo.description;

	if (bookDescriptionData === undefined) {
		return (bookDescription = "No description available.");
	} else {
		return (bookDescription = bookDescriptionData);
	}
}
async function bookAuthor(bookInfo) {
	let bookAuthor;
	if(bookInfo.data.items[0].volumeInfo.authors === undefined) {
		return (bookAuthor = "No author available.");
	} 
	const bookAuthorData = bookInfo.data.items[0].volumeInfo.authors.join(", ");

	if (bookAuthorData === undefined) {
		return (bookAuthor = "No author available.");
	} else {
		return (bookAuthor = bookAuthorData);
	}
}
async function bookTitle(bookInfo) {
	let bookTitle;

	const bookTitleData = bookInfo.data.items[0].volumeInfo.title;

	return (bookTitle = bookTitleData);
}
async function bookLang(bookInfo) {
	let bookLang;
	const bookLangData = bookInfo.data.items[0].volumeInfo.language;
	if (bookLangData === undefined) {
		return (bookLang = "No language available.");
	} else {
		return (bookLang = bookLangData);
	}
}
async function bookPub(bookInfo) {
	let bookPub;
	const bookPubData = bookInfo.data.items[0].volumeInfo.publishedDate;
	if (bookPubData === undefined) {
		return (bookPub = "No published date available.");
	} else {
		return (bookPub = bookPubData);
	}
}
async function bookImg(bookInfo) {
	let bookImg;
	const bookImgData = bookInfo.data.items[0].volumeInfo.imageLinks;
	if (bookInfo.data.items[0].volumeInfo.imageLinks === undefined) {
		return bookImg = "https://cdn.discordapp.com/emojis/948892682032394240.png"
	} else {
		return (bookImg = bookImgData.thumbnail);
	}
}
async function bookLink(bookInfo) {
	let bookLink;
	const bookLinkData = bookInfo.data.items[0].volumeInfo.infoLink;
	if (bookLinkData === undefined) {
		return (bookLink = "No link available.");
	} else {
		return (bookLink = bookLinkData);
	}
}
async function bookPageCount(bookInfo) {
	let bookPageCount;
	const bookPageCountData = bookInfo.data.items[0].volumeInfo.pageCount;
	if (bookPageCountData === undefined) {
		return (bookPageCount = "No page count available.");
	} else {
		return (bookPageCount = bookPageCountData);
	}
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
