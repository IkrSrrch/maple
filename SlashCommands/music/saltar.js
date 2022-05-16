const player = require("../../client/player");

module.exports = {
    name: "saltar",
    description: "Saltar la cancion actual",
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: `${client.emotes.error} | No se esta reproduciendo nada.`,
            });

        await queue.skip();

        interaction.followUp({ content: `${client.emotes.success} | Saltando la cancion actual.` });
    },
};
