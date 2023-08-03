import {getNft} from "../../evrloot-api.js";
import {createFishingBoardEmbed} from "../embeds/fishing-board-embed.js";

export const fishingBoardSelectMenu = {
    async execute(interaction) {
        interaction.deferReply();
        const fishingBoardId = interaction.values[0];

        console.log('requested', fishingBoardId, 'by', interaction.message.interaction.user.username);

        const fishingBoardInfo = await getNft(fishingBoardId);

        interaction.editReply({
            embeds: createFishingBoardEmbed(fishingBoardInfo, interaction.message.interaction.user),
        })
    },
}
