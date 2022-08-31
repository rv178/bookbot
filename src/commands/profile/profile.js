// warning: spaghetti code ahead
// TODO: import profile.Starred array and display first 5 books in array in this image.

const Canvas = require("canvas");
const {
	MessageAttachment,
	MessageEmbed,
} = require("discord.js");
const Schema = require("../../models/profile.js");
const { getVolInfo, bookImg } = require("../../utils/functions.js");
const applyText = (canvas, text) => {
	Canvas.registerFont("assets/fonts/Fredoka-light.ttf", {
		family: "Fredoka",
	});
	const ctx = canvas.getContext("2d");
	let fontSize = 90;

	do {
		ctx.font = `${(fontSize -= 10)}px Fredoka`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

module.exports = {
	name: "profile",
	description: "Returns information about invoking user's profile.",
	run: async (client, interaction) => {
		// defer reply because it may take more than 3s.
		await interaction.deferReply();

		const canvas = Canvas.createCanvas(1000, 700);
		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage("assets/bg.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.font = applyText(canvas, interaction.member.displayName);
		ctx.fillStyle = "#ffffff";
		ctx.fillText(
			interaction.member.displayName,
			canvas.width / 15,
			canvas.height / 5
		);

		ctx.font = `56px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(`Favourite genre:`, canvas.width / 15, canvas.height / 3);
		let genre;
		let bookimg;
		const profile = await Schema.findOne({ User: interaction.member.id });
		if (profile) {
			const book =
				profile.Starred[
				Math.floor(Math.random() * profile.Starred.length)
				];
			if (!profile) return interaction.editReply({ text: "No data." })
			const bookdata = await getVolInfo(book);
			bookimg = await Canvas.loadImage(await bookImg(bookdata));
			genre = profile.Genre;
		} else {
			bookimg = await Canvas.loadImage("assets/bookbot.png");
			genre = "None";
		}

		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 4;
		ctx.strokeRect(700, 360, bookimg.width * 1.5, bookimg.height * 1.5);
		ctx.drawImage(
			bookimg,
			700,
			360,
			bookimg.width * 1.5,
			bookimg.height * 1.5
		);

		ctx.font = `52px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(`${genre}`, canvas.width / 15, canvas.height / 2.2);

		const avatar = await Canvas.loadImage(
			interaction.member.displayAvatarURL({ format: "png" })
		);

		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(800, 140, 95, 0, Math.PI * 2, true);
		ctx.lineWidth = 8;
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(avatar, 700, 40, 200, 200);

		const attachment = new MessageAttachment(canvas.toBuffer(), "ui.png");
		const embed = new MessageEmbed()
			.setTitle(`${interaction.user.username}'s Profile`)
			.setImage(`attachment://${attachment.name}`)
			.setColor("BLUE");
		await interaction.editReply({ embeds: [embed], files: [attachment] });
	},
};
