const player = require("../../client/player");

module.exports = {
    name: "volumen",
    description: "Cambia o verifica el volumen de la cancion actual",
    options: [
        {
            name: "porcentaje",
            description: "Porcentaje de volumen a cambiar a ",
            type: "INTEGER",
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const volumePercentage = interaction.options.getInteger("porcentaje");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: `${client.emotes.error} | No se esta reproduciendo nada.`,
            });

        if (!volumePercentage)
            return interaction.followUp({
                content: `${client.emotes.success} | El volumen actual es \`${queue.volume}%\`.`,
            });

        if (volumePercentage < 0 || volumePercentage > 100)
            return interaction.followUp({
                content: `${client.emotes.error} | El volumen ha de ser entre 1 y 100.`,
            });

        queue.setVolume(volumePercentage);

        return interaction.followUp({
            content: `${client.emotes.success} | Se ajusto el volumen a \`${volumePercentage}%\``,
        });
    },
};
