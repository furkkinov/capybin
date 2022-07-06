const env = require('dotenv').config().parsed;
const { Client, Intents, MessageButton, MessageEmbed, MessageActionRow } = require('discord.js');
const myIntents = new Intents(131071);
const client = new Client({ intents: myIntents });
const {Hesperus} = require('hesperus');

new Hesperus(client, {
  rootDir: __dirname,
  botOwners: [env["BOT_OWNER"]]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(env["DISCORD_TOKEN"]);