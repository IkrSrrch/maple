const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
    name: "reproducir",
    description: "Reproduce una cancion",
    options: [
        {
            name: "titulocancion",
            description: "Titulo de la cancion",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const songTitle = interaction.options.getString("titulocancion");

        if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: `${client.emotes.error} | Unete primero a un canal de voz.`,
            });

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        interaction.followUp({ content: `${client.emotes.success} | Se va a reproducir **${songTitle}**.` });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
