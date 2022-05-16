const player = require("../../client/player");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const getLyrics = (title) =>
    new Promise(async (ful, rej) => {
        const url = new URL("https://some-random-api.ml/lyrics");
        url.searchParams.append("title", title);

        try {
            const { data } = await axios.get(url.href);
            ful(data);
        } catch (error) {
            rej(error);
        }
    });

const substring = (length, value) => {
    const replaced = value.replace(/\n/g, "--");
    const regex = `.{1,${length}}`;
    const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

    return lines;
};

const createResponse = async (title) => {
    try {
        const roleColor =
          message.guild.me.displayHexColor === "#000000"
            ? "#ffffff"
            : message.guild.me.displayHexColor;        
    
        const data = await getLyrics(title);

        const embeds = substring(4096, data.lyrics).map((value, index) => {
            const isFirst = index === 0;

            return new MessageEmbed({
                title: isFirst ? `${data.title} - ${data.author}` : null,
                thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
                description: value,
                color: roleColor
            });
        });

        return { embeds };
    } catch (error) {
        return `:x: | No pude encontrar ninguna letra para esta cancion :(`;
    }
};

module.exports = {
    name: "letra",
    description: "Muestra la letra de la cancion actual o una especifica",
    options: [
        {
            name: "titulo",
            description: "cancion especifica",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        const title = interaction.options.getString("titulo");
        const sendLyrics = (songTitle) => {
            return createResponse(songTitle)
                .then((res) => {
                    interaction.followUp(res);
                })
                .catch((err) => console.log({ err }));
        };

        if (title) return sendLyrics(title);

        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: `${client.emotes.error} | No se esta reproduciendo nada.`
            });

        return sendLyrics(queue.current.title);
    }
};
