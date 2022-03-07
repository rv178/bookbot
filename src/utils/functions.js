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
	if(bookLangData === undefined) {
		return (bookLang = "No language available.");
	} else {	
	return (bookLang = bookLangData);
	}
}
async function bookPub(book) {
	const bookInfo = await getVolInfo(book);
	let bookPub;
	const bookPubData = bookInfo.data.items[0].volumeInfo.publishedDate;
	if(bookPubData === undefined) {
		return (bookPub = "No published date available.");
	} else {
	return (bookPub = bookPubData);
	}
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
	if(bookLinkData === undefined) {
		return (bookLink = "No link available.");
	} else {
	return (bookLink = bookLinkData);
	}
}
async function bookPageCount(book) {
	const bookInfo = await getVolInfo(book);
	let bookPageCount;
	const bookPageCountData = bookInfo.data.items[0].volumeInfo.pageCount;
	if(bookPageCountData === undefined) {
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
