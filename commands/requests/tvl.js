const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedHelper } = require('../../embed_handler.js')
const { version } = require('../../config.json')


/*
Data Needed: 
name: jsonData['name']
description: jsonData['description']
logo: jsonData['logo]

dictionary and try key value for field, if failed skip

*/



async function grabProtocol(protocol) {
    const response = await fetch(`https://api.llama.fi/protocol/${protocol}`);
    const jsonData = await response.json();

    
	return jsonData
}

function embedHandler(data) {
	const img_link = 'https://cdn.discordapp.com/avatars/281626075996356610/5c61cda35668a3aaa2274d62e63e21db.webp?size=240'
	const tempEmbed = new EmbedBuilder()
	
	.setTimestamp()
	.setFooter({text:`Version: ${version}`})
	return tempEmbed
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tvl')
		.setDescription('Replies with Total Value Locked in a protocol (via Defillamma))')
		.addStringOption(option => 
			option.setName('name')
				.setDescription('Input protocol name')
				.setRequired(true)),
	async execute(interaction) {
		const response = await grabProtocol(interaction.options.getString('name'))
		const testEmbed = embedHandler(response)
		return interaction.reply({embeds : [testEmbed]} );
	},

};