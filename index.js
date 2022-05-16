const { Client, Collection } = require("discord.js");
const config = require("./config.json")

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.emotes = config.emoji;

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
