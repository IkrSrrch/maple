const player = require("../../client/player");

module.exports = {
    name: "pausa",
    description: "Pausa la cancion actual",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(true);

        return interaction.followUp({ content: `${client.emotes.success} | Pausada con exito.` });
    },
};
