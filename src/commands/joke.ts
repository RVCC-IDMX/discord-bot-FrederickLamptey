const api = require('discord.js');
const { MessageEmbed, Message } = require('discord.js');
const axios = require('axios');


module.exports = {

  callback: async (message: typeof Message, ...args: string[]) => {



    const url = `https://icanhazdadjoke.com/`;
    console.log(url)

    let joke, response;

    try {
      response = await axios.create({

        baseURL: url,
        headers: {
          Accept: "application/json"
        }
      });
      response = await axios.create(url)
      console.log(response)
      joke = response.data;
      console.log(joke);
    } catch (e) {
      console.log(e)
      return message.channel.send('Could not find a joke');
    }




    const embed = new MessageEmbed()
      .setTitle(`Heres a Joke`)

      .setDescription(`Joke will come here`)

    message.channel.send({ embeds: [embed] });
  },
};