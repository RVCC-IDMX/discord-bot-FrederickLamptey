import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let product = 1;
    args.forEach((arg: string) => {
      product *= parseInt(arg, 10);
    });
    message.reply(`The product is ${product}`);
  },
};