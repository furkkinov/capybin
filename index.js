const env = require('dotenv').config().parsed;
const { Client, Intents, Collection } = require('discord.js');
const myIntents = new Intents(131071);
const client = new Client({ intents: myIntents });
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(env["DISCORD_TOKEN"]);
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

(async() => {
    await rest.put(
        Routes.applicationCommands(env["CLIENT_ID"]),
        { body: commands },
    );
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(env["DISCORD_TOKEN"]);