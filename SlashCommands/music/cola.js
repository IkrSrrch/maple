const player = require("../../client/player");

module.exports = {
    name: "cola",
    description: "Muestra la cola de canciones",
    run: async (client, interaction) => {
        const roleColor =
        interaction.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : interaction.guild.me.displayHexColor;

        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: `${client.emotes.error} | No se esta reproduciendo nada.`,
            });

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. [**${m.title}**](${m.url}) - ${
                m.requestedBy.tag
            }`;
        });

        return interaction.followUp({
            embeds: [
                {
                    title: "Cola de Canciones",
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${
                                  queue.tracks.length - tracks.length === 1
                                      ? `${
                                            queue.tracks.length - tracks.length
                                        } mas cancion`
                                      : `${
                                            queue.tracks.length - tracks.length
                                        } mas canciones`
                              }`
                            : ""
                    }`,
                    color: roleColor,
                    fields: [
                        {
                            name: "Reproduciendo Ahora",
                            value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
                        },
                    ],
                },
            ],
        });
    },
};
