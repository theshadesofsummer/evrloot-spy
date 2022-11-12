import {getSoulMetadata} from "../../evrloot-api.js";
import {createSoulEmbed} from "../embeds/soul-embed.js";

export const soulInfoButton = {
    async execute(interaction) {
        await interaction.deferReply()

        const soulId = interaction.customId;

        const metadata = await getSoulMetadata(soulId);

        console.log(metadata)

        await interaction.editReply({embeds: createSoulEmbed(metadata)});
    },
}