const client = require("../../index");
const log = require("../utils/logger");

client.on("ready", () => {
	log.warn(`Logged in as ${client.user.tag}.`);
	setInterval(async ()=>{
        let textList = ['Books are for nerds','Reading a book!',`${client.user.guilds.size} servers!`, 'Books', 'Books are cool', 'imagine a book']
        var text = textList[Math.floor(Math.random() * textList.length)];
        client.user.setActivity(text , { type: 'WATCHING' })
    },30000) // milliseconds
});
