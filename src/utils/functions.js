// TODO: cache response to avoid unneeded calls

const axios = require("axios");
const Discord = require("discord.js");
const log = require("./logger.js");
const cache = new Map();

async function getVolInfo(book) {
	const api = axios.create({
		baseURL: "https://www.googleapis.com/books/v1",
	});

	if (cache.has(book)) {
		log.info(`Bookinfo exists in cache, query "${book}".`);
	} else {
		const bookInfo = await api
			.get(`/volumes?q=${book}`)
			.catch(function (error) {
				return interaction.reply({
					content: `No books found. Error: ${error}`,
				});
			});

		cache.set(String(book), bookInfo);
	}

	return cache.get(book);
}

async function bookDesc(bookInfo) {
	const bookDescriptionData = bookInfo.data.items[0].volumeInfo.description;

	if (bookDescriptionData === undefined) {
		return (bookDescription = "No description available.");
	} else {
		return (bookDescription = bookDescriptionData);
	}
}
async function bookAuthor(bookInfo) {
	if (bookInfo.data.items[0].volumeInfo.authors === undefined) {
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
	const bookTitleData = bookInfo.data.items[0].volumeInfo.title;

	return (bookTitle = bookTitleData);
}
async function bookLang(bookInfo) {
	const bookLangData = bookInfo.data.items[0].volumeInfo.language;
	if (bookLangData === undefined) {
		return (bookLang = "No language available.");
	} else {
		return (bookLang = bookLangData);
	}
}
async function bookPub(bookInfo) {
	const bookPubData = bookInfo.data.items[0].volumeInfo.publishedDate;
	if (bookPubData === undefined) {
		return (bookPub = "No published date available.");
	} else {
		return (bookPub = bookPubData);
	}
}
async function bookImg(bookInfo) {
	const bookImgData = bookInfo.data.items[0].volumeInfo.imageLinks;
	if (bookInfo.data.items[0].volumeInfo.imageLinks === undefined) {
		return (bookImg =
			"https://cdn.discordapp.com/emojis/948892682032394240.png");
	} else {
		return (bookImg = bookImgData.thumbnail);
	}
}
async function bookLink(bookInfo) {
	const bookLinkData = bookInfo.data.items[0].volumeInfo.infoLink;
	if (bookLinkData === undefined) {
		return (bookLink = "No link available.");
	} else {
		return (bookLink = bookLinkData);
	}
}
async function bookPageCount(bookInfo) {
	const bookPageCountData = bookInfo.data.items[0].volumeInfo.pageCount;
	if (bookPageCountData === undefined) {
		return (bookPageCount = "No page count available.");
	} else {
		return (bookPageCount = bookPageCountData);
	}
}
function sendHook(webhook, title, desc, footertxt, footericon) {
	const hook = new Discord.WebhookClient({ url: webhook });
	const embed = new Discord.MessageEmbed()
		.setTitle(title)
		.setDescription(desc)
		.setFooter({ text: footertxt, iconURL: footericon })
		.setTimestamp()
		.setColor("BLUE");

	hook.send({
		embeds: [embed],
		username: "Bookbot",
		avatarURL: "https://cdn.discordapp.com/emojis/948892682032394240.png",
	});
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
	sendHook,
};
