import {getInteractionEntryRight} from "../../interaction-map.js";
import {createChooseSoulEmbed} from "../embeds/choose-soul-embed.js";
import {createPaginationButtons} from "../components/create-paginations-buttons.js";

export const paginationRightButton = {
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        console.log(interaction.message.id);

        const {page: newPage, info: soulInfosWithMetadata} = getInteractionEntryRight(interaction.message.id)

        await interaction.editReply({
            embeds: createChooseSoulEmbed(soulInfosWithMetadata, newPage),
            components: createPaginationButtons(soulInfosWithMetadata, newPage)
        });
    },
}