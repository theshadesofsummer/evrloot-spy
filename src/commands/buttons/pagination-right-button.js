import {getInteractionEntry} from "../../interaction-map.js";
import {createChooseSoulEmbed} from "../embeds/choose-soul-embed.js";
import {createPaginationButtons} from "../components/create-paginations-buttons.js";

export const paginationRightButton = {
    async execute(interaction) {
        const soulInfosWithMetadata = getInteractionEntry(interaction.message.id)

        await interaction.message.edit({
            ephemeral: true,
            embeds: createChooseSoulEmbed(soulInfosWithMetadata, 1),
            components: createPaginationButtons(soulInfosWithMetadata, 1)
        });
    },
}