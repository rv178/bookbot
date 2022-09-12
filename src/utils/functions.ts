import axios from "axios";
import Discord from "discord.js";
import log from "./logger";
const cache = new Map();

export async function getVolInfo(book: string) {
	const api = axios.create({
		baseURL: "https://www.googleapis.com/books/v1",
	});

	if (cache.has(book)) {
		log.info(`Bookinfo exists in cache, query "${book}".`);
	} else {
		const bookInfo = await api
			.get(`/volumes?q=${book}`)
			.catch(function (error: string) {
				// @ts-ignore
				return interaction.reply({
					content: `No books found. Error: ${error}`,
				});
			});

		cache.set(book, bookInfo);
	}

	return cache.get(book);
}

export async function bookDesc(bookInfo: any) {
	const bookDescriptionData = bookInfo.data.items[0].volumeInfo.description;
	let book_desc = "No description available.";

	if (bookDescriptionData !== undefined) {
		book_desc = bookDescriptionData;
	}

	return book_desc;
}

export async function bookAuthor(bookInfo: any) {
	let book_author = "No author available.";

	if (bookInfo.data.items[0].volumeInfo.authors !== undefined) {
		const bookAuthorData = bookInfo.data.items[0].volumeInfo.authors.join(", ");
		book_author = bookAuthorData;
	}

	return book_author;
}

export async function bookTitle(bookInfo: any) {
	const bookTitleData = bookInfo.data.items[0].volumeInfo.title;
	const book_title = bookTitleData;

	return book_title;
}

export async function bookLang(bookInfo: any) {
	const bookLangData = bookInfo.data.items[0].volumeInfo.language;
	let book_lang = "No language available.";

	if (bookLangData !== undefined) {
		book_lang = bookLangData;
	}

	return book_lang;
}

export async function bookPub(bookInfo: any) {
	const bookPubData = bookInfo.data.items[0].volumeInfo.publishedDate;
	let book_pub = "No published date available";

	if (bookPubData !== undefined) {
		book_pub = bookPubData;
	}

	return book_pub;
}

export async function bookImg(bookInfo: any) {
	const bookImgData = bookInfo.data.items[0].volumeInfo.imageLinks;
	let book_img_data = "No image available.";
	// fix this shit
	if (bookImgData !== undefined) {
		book_img_data = bookImgData.thumbnail;
	}

	return book_img_data;
}

export async function bookLink(bookInfo: any) {
	const bookLinkData = bookInfo.data.items[0].volumeInfo.infoLink;
	let book_link = "No link available.";

	if (bookLinkData !== undefined) {
		book_link = bookLinkData;
	}

	return book_link;
}

export async function bookPageCount(bookInfo: any) {
	const bookPageCountData = bookInfo.data.items[0].volumeInfo.pageCount;
	let book_pg_count = "No page count available.";

	if (bookPageCountData !== undefined) {
		book_pg_count = bookPageCountData;
	}

	return book_pg_count;
}

export function sendHook(
	webhook: string,
	title: string,
	desc: string,
	footertxt: string,
	footericon: string,
) {
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
