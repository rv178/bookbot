const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
  name: 'book',
  description: 'U',
  options: [{
    name: "book",
    type: "STRING",
    description: "Provide a book.",
    required: true,
}],
  run: async(client, interaction, args) => {
     const book = interaction.options.get("book").value;
     const bookInfo = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
     console.log(bookInfo.data.totalItems)
     if(bookInfo.data.totalItems === 0) {
      return interaction.followUp({content: "No books found."});
     } 
      const bookEmbed = new Discord.MessageEmbed()
      .setTitle(bookInfo.data.items[0].volumeInfo.title)
      .setDescription(bookInfo.data.items[0].volumeInfo.description)
      .setColor("#0099ff")
      .setThumbnail(bookInfo.data.items[0].volumeInfo.imageLinks.thumbnail)

      interaction.followUp({embeds:[bookEmbed]});
  }
}