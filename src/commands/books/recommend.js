const Discord = require('discord.js');
const Schema = require('../../models/profile.js');
const axios = require('axios');
module.exports = {
  name: 'recommend',
  description: 'Get a book recommendation.',
  options: [
    {
        type: 'STRING',
        name: 'genre',
        description: 'The book genre you want to get a recommendation for.',
    },
    ],
  run: async(client, interaction, args) => {
    const data = await Schema.findOne({ User: interaction.user.id });
    if(data) {
    const genre = interaction.options._hoistedOptions.length ? interaction.options._hoistedOptions[0].value : data.Genre
    const book = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
    const bookInfo = book.data['items'][0]['volumeInfo']
    const bookTitle = bookInfo['title']
    const bookAuthor = bookInfo['authors'][0]
    const bookImg = bookInfo['imageLinks']['thumbnail']
    const bookDesc = bookInfo['description']
    const embed = new Discord.MessageEmbed()
    .setTitle(bookTitle)
    .setAuthor({name: bookAuthor, iconURL: client.user.avatarURL({dynamic:true})})
    .setColor('#0099ff')
    .setDescription(`Desc: ${bookDesc}`)
    .setThumbnail(bookImg)
    interaction.reply({embeds: [embed]})
    }

  }
}