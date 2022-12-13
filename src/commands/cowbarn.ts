import { Message, MessageEmbed } from 'discord.js';
import cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { channel } from 'diagnostics_channel';

export default {
  callback: (message: Message, ...args: string[]) => {
    const cow = args[0];
    const idx = getRandomInt(0, quotes.length);
    const quoteOBJ = quotes[idx];
    const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

    let opts: IOptions = {
      text: text,
      e: '^^',
      r: true,
      //f:'radio',
    };

    if (cow !== 'random') {
      opts.r = false;
      opts.f = cow;
    }
    let output;
    try {
      output = cowsay.say(opts);
    } catch {
      output = 'Nonexistent cow';
    }
    if (output.length > 2000) {
      output = 'Darn all the cows in the barn are sleeping';
    }
    console.log(output);
    const reply = output.replace(/```/g, "``'");

    const MessageEmbed = {
      color: 0x0099ff,
      title: 'The Cow Pit',
      url: 'https://discord.js.org',
      author: {
        name: 'ItsStephBoogie',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
      },
      description: '````${reply}````',
      thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };
    message.reply({ embeds: [MessageEmbed] });
  },
};