// warning: spaghetti code ahead
// TODO: import profile.Starred array and display first 5 books in array in this image.

import Canvas from "canvas";
import {
	ALLOWED_EXTENSIONS,
	AttachmentBuilder,
	EmbedBuilder,
} from "discord.js";
import Schema from "../../models/profile";
import { bookImg, getVolInfo } from "../../utils/functions";
import { Command } from "../../structures/command";

const applyText = (canvas: any, text: string) => {
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

export default new Command({
	name: "profile",
	description: "Returns information about invoking user's profile.",
	run: async ({ interaction }) => {
		// defer reply because it may take more than 3s.
		await interaction.deferReply();

		const canvas = Canvas.createCanvas(1000, 700);
		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage("assets/bg.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.font = applyText(canvas, interaction.user.username);
		ctx.fillStyle = "#ffffff";
		ctx.fillText(
			interaction.user.username,
			canvas.width / 15,
			canvas.height / 5,
		);

		ctx.font = "56px Fredoka";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Favourite genre:", canvas.width / 15, canvas.height / 3);
		let genre;
		let bookimg;
		const profile = await Schema.findOne({ User: interaction.user.id });
		if (profile) {
			const book = profile.Starred[
				Math.floor(Math.random() * profile.Starred.length)
			];
			if (!profile) return interaction.editReply({ text: "No data." } as any);
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
			bookimg.height * 1.5,
		);

		ctx.font = "52px Fredoka";
		ctx.fillStyle = "#ffffff";
		ctx.fillText(`${genre}`, canvas.width / 15, canvas.height / 2.2);

		const avatar = await Canvas.loadImage(
			interaction.user.displayAvatarURL({ extension: ALLOWED_EXTENSIONS[1] }), // allowed extension: png
		);

		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(800, 140, 95, 0, Math.PI * 2, true);
		ctx.lineWidth = 8;
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(avatar, 700, 40, 200, 200);

		const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ui.png' });
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username}'s Profile`)
			.setImage(`attachment://${attachment.name}`)
			.setColor("Blue");
		await interaction.editReply({ embeds: [embed], files: [attachment] });
	},
});
