import {getSoulMetadata} from "../../evrloot-api.js";
import {createSoulEmbed} from "../embeds/soul-embed.js";

export const soulInfoSelectMenu = {
    async execute(interaction) {

        const soulId = interaction.values[0];
        console.log(soulId);

        const metadata = await getSoulMetadata(soulId);

        await interaction.reply({embeds: createSoulEmbed(metadata)});
    },
}