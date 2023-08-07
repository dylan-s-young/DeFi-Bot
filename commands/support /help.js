const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedHelper } = require('../../embed_handler.js')
const { version } = require('../../config.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('tvl')
		.setDescription('Replies with Total Value Locked in a protocol (via Defillamma))')
		.addStringOption(option =>
			option.setName('help')
				.setDescription('input protocol name')
				.setRequired(true)),
	async execute(interaction) {
		const response = await cryptoGrabDetails(interaction.options.getString('name'))
		const testEmbed = embedHandler(response)
		return interaction.reply({ embeds: [testEmbed] });
	},

};