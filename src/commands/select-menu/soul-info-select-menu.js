import {getNft} from "../../evrloot-api.js";
import {createSoulEmbed} from "../embeds/soul-embed.js";

export const soulInfoSelectMenu = {
    async execute(interaction) {
        const soulId = interaction.values[0];

        console.log('requested', soulId, 'by', interaction.message.interaction.user.username);

        const soul = await getNft(soulId);

        interaction.reply({
            embeds: createSoulEmbed(soul, interaction.message.interaction.user),
        })
    },
}
