// const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Replies with guide!'),
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Click me!')
          .setStyle(ButtonStyle.Primary))
        .addComponents(
          new ButtonBuilder()
            // .setCustomId('primary')
            .setLabel('Repo!')
            .setURL('https://github.com/RVCC-IDMX/discord-bot-FrederickLamptey')
            .setStyle(ButtonStyle.Link),
      );

    await interaction.reply({ content: 'I think you should,', components: [row] });
  },
};