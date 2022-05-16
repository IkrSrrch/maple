const player = require("../../client/player");

module.exports = {
    name: "resumir",
    description: "Resumir la cancion actual",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(false);

        return interaction.followUp({ content: `${client.emotes.success} | Resumiendo la cancion actual.` });
    },
};
