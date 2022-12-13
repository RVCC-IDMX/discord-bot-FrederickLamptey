import cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';

import { Message } from 'discord.js';
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
      output = 'That cow does not exist';
    }
    if (output.length > 2000) {
      output = 'Darn all the cows in the barn are sleeping';
    }
    console.log(output);
    const reply = output.replace(/```/g, "``'");
    message.reply(`\`\`\`\n${reply}\n\`\`\``);
  },
};