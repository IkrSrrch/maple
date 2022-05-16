const player = require("../../client/player");

module.exports = {
    name: "reproduciendo-ahora",
    description: "Muestra informacion sobre la cancion actual",
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

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.followUp({
            embeds: [
                {
                    title: "Reproduciendo Ahora",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: roleColor,
                    footer: {
                        text: `Pedido por ${queue.current.requestedBy.tag}`,
                    },
                },
            ],
        });
    },
};
