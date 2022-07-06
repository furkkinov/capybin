const { SlashCommandBuilder } = require('@discordjs/builders');
let locales = require("../locales");
const database = require("../database");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(locales.ru.commandsDescription.ping.command)
		.setDescriptionLocalization("ru", locales.ru.commandsDescription.ping.command)
		.setDescriptionLocalization("en-US", locales.en.commandsDescription.ping.command),
	async execute(interaction) {
		await interaction.reply({
			content: 'Pong!'
		});
	},
};