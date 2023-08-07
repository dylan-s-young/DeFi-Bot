const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedHelper = require('../../embed_handler')
const { version } = require('../../config.json')

// MARK: Constants 
const api_mapping = {
	'Current Price': 'current_price',
	'All Time High': 'ath',
	'Current Market Cap': 'current_marketcap',
	'Fully Diluted Valuation': 'fdv',
	'Circulating Supply': 'circulating_supply',
	'Max Supply': 'max_supply '

}

// MARK: API Calls 
async function getCryptoDetails(coin) {
	const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
	const jsonData = await response.json()

	return {
		'image': jsonData['image']['large'],
		'id': jsonData['id'],
		'symbol': jsonData['symbol'],
		'name': jsonData['name'],
		'description': jsonData['description']['en'],
		'current_price': jsonData['market_data']['current_price']['usd'],
		'ath': jsonData['market_data']['ath']['usd'],
		'current_marketcap': jsonData['market_data']['market_cap']['usd'],
		'fdv': jsonData['market_data']['fully_diluted_valuation']['usd'],
		'circulating_supply': jsonData['market_data']['circulating_supply'],
		'max_supply': jsonData['market_data']['max_supply'],
		'24hr_change': jsonData['market_data']['price_change_24h']
	}
}

/*
	Visualize data through discordEmbed
*/
function embedVisualization(data) {
	const img_link = 'https://cdn.discordapp.com/avatars/281626075996356610/5c61cda35668a3aaa2274d62e63e21db.webp?size=240'
	const messageEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(data['name'])
		.setAuthor({ name: 'Golden', iconURL: img_link, url: 'https://github.com/GoldenTBE' })
		.setURL(`https://www.coingecko.com/en/coins/${data['name'].toLowerCase()}`)
		.setThumbnail(data['image'])
		.setDescription(data['description'])



		// { name: 'Current Price', value: `\$${data['current_price'].toLocaleString()}`, inline: true },
		// { name: 'All Time High', value: `\$${data['ath'].toLocaleString()}`, inline: true },
		// { name: 'Current Market Cap', value: `\$${data['current_marketcap'].toLocaleString()}`, inline: true },
		// { name: 'Fully Diluted Valuation', value: `\$${data['fdv'].toLocaleString()}`, inline: true },
		// { name: 'Circulating Supply', value: `${data['circulating_supply'].toLocaleString()}`, inline: true },
		// { name: 'Max Supply', value: `${data['max_supply'].toLocaleString()}`, inline: true }


		.setTimestamp()
		.setFooter({ text: `Version: ${version}` })
	for (const [key, value] of Object.entries(api_mapping)) {
		console.log((data[value]))
		if (data[value]) {
			messageEmbed.addFields({ name: key, value: `\$${data[value].toLocaleString()}`, inline: true })
		}
	}

	return embedHelper.errorEmbed()
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crypto')
		.setDescription('Replies with details of cryptocurrency (via CoinGecko)')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Input Crypto name')
				.setRequired(true)),
	async execute(interaction) {
		const response = await getCryptoDetails(interaction.options.getString('name'))
		testEmbed = embedVisualization(response)
		return interaction.reply({ embeds: [testEmbed] });
	},
};