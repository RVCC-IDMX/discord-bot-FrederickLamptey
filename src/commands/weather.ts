const api = require('discord.js');
const { MessageEmbed, Message } = require('discord.js');
const axios = require('axios');
import dotenv from 'dotenv';
dotenv.config()

module.exports = {

  callback: async (message: typeof Message, ...args: string[]) => {
    const api_key = process.env.APIKEY
    if (!args[0]) {
      return message.channel.send('Please enter a City');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=imperial&appid=${api_key}`;
    console.log(url)

    let response, city;

    try {
      response = await axios.get(url);
      city = response.data;
      console.log(city);
    } catch (e) {
      return message.channel.send('Could not find that city');
    }

    const sunrisedate = new Date((city.sys.sunrise + city.timezone) * 1000)
    /*let hours = sunrisedate.getUTCHours().toString
    let minutes = sunrisedate.getUTCMinutes().toString
    const risedate = `${hours}:${minutes}`

    const sunsetdate = new Date((city.sys.sunset+city.timezone)*1000)
    hours = (sunsetdate.getUTCHours().toFixed()-12).toString()*/

    //Mon, 09 May 2022 06:38:30 GMT

    const risedate = sunrisedate.toUTCString()
    //console.log(risedate.substring(18,22))

    const sunsetdate = new Date((city.sys.sunset + city.timezone - 12 * 60 * 60) * 1000)
    const setdate = sunsetdate.toUTCString()
    //console.log(setdate.substring(18,22))


    const embed = new MessageEmbed()
      .setTitle(`${city.name}- ${city.sys.country}`)

      .setThumbnail(`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
      .setDescription(city.weather[0].description)
      .addFields({
        name: 'Current Temperature',
        value: `${city.main.temp.toFixed()} °F`,
      })
      .addFields({
        name: 'Low temperature',
        value: `${city.main.temp_min.toFixed()}°F`,
        inline: true
      })
      .addFields({
        name: 'High temperature',
        value: `${city.main.temp_max.toFixed()}°F`,
        inline: true
      })
      .addFields({ name: '\u200B', value: '\u200B' })
      .addFields({
        name: 'Sunrise',
        value: `${risedate.substring(18, 22)} AM`,
        inline: true
      })
      .addFields({
        name: 'Sunset',
        value: `${setdate.substring(18, 22)} PM`,
        inline: true
      })





    message.channel.send({ embeds: [embed] });
  },
};