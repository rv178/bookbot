// To do: get data from mongoDB god dont ask me how :weird:

const Canvas = require("canvas");
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

module.exports = {
    name: "profile/:userid",
    run: async (req, res) => {

        const user = req?.params?.userid;
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

		ctx.font = applyText(canvas, "PROFILE USERNAME");
		ctx.fillStyle = "#ffffff";
		ctx.fillText(
			"PROFILE USERNAME",
			canvas.width / 15,
			canvas.height / 2.5
		);


		ctx.font = `30px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(`Favourite genre:`, canvas.width / 15, canvas.height / 1.7);
		let genre = 'PROFILE GENRE'
		ctx.font = `26px Fredoka`;
		ctx.fillStyle = "#ffffff";
		ctx.fillText(
			`${genre}`,
			canvas.width / 15,
			canvas.height / 1.3
		);

		const avatar = await Canvas.loadImage(
			// interaction.member.displayAvatarURL({ format: "png" })
            "https://cdn.discordapp.com/avatars/403657714812715008/a_198334be125b753bfb918ab9b1f7bcc0.png?size=1024"
		);

		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(540, 130, 95, 0, Math.PI * 2, true);
		ctx.lineWidth = 8;
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(avatar, 440, 30, 200, 200);
        res.end(canvas.toBuffer());
    }
}