// TODO: get avatar url and name from user id

const Canvas = require("canvas");
const Schema = require("../../models/profile.js");
const applyText = (canvas, text) => {
	Canvas.registerFont("assets/fonts/Fredoka-light.ttf", {
		family: "Fredoka",
	});
	const ctx = canvas.getContext("2d");
	let fontSize = 70;

	do {
		ctx.font = `${(fontSize -= 10)}px Fredoka`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
// --- temporarily commented out --

//const axios = require("axios");

//async function get_user_info(user) {
//axios
//.get(`https://discord.com/api/users/${user}`, {
//headers: {
//Authorization: `Bot ${process.env.TOKEN}`,
//},
//})
//.then((res) => {
//const { avatar_url, id, username } = res.data;
//return { avatar_url, id, username };
//});
//}
module.exports = {
	name: "profile/:userid",
	run: async (req, res) => {
		const user = req?.params?.userid;
		// TODO: replace with actual data
		const avatar_url =
			"https://cdn.discordapp.com/avatars/948174696136974337/1f464e8aeb3d8a5594253fa3439d269f.png";
		const username = "BookBot";

		if (isNaN(user)) {
			res.status(400).send("User ID must be a number.");
		}

		if (user.length !== 18) {
			return res.status(400).send("User ID must be 18 digits long.");
		}

		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage("assets/bg.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.font = applyText(canvas, username);
		ctx.fillStyle = "#ffffff";
		ctx.fillText(user.displayName, canvas.width / 15, canvas.height / 2.5);

		ctx.font = `30px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(
			`Favourite genre:`,
			canvas.width / 15,
			canvas.height / 1.7
		);
		let genre;
		const profile = await Schema.findOne({ User: user });
		if (profile) {
			genre = profile.Genre;
		} else {
			genre = "None";
		}
		ctx.font = `26px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(`${genre}`, canvas.width / 15, canvas.height / 1.3);

		const avatar = await Canvas.loadImage(avatar_url);

		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(540, 130, 95, 0, Math.PI * 2, true);
		ctx.lineWidth = 8;
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(avatar, 440, 30, 200, 200);

		res.end(canvas.toBuffer());
	},
};
