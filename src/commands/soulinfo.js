import { SlashCommandBuilder } from "@discordjs/builders";
import {getSouls} from "../evrloot-api.js";

import {createChooseSoulEmbed} from './embeds/choose-soul-embed.js';

export const soulInfoCommand = {
    data: new SlashCommandBuilder()
        .setName('soul-info')
        .setDescription('Show of your legendary soul to others!')
        .addStringOption(option =>
            option.setName('address')
                .setDescription('Put in the KSM address of your wallet')
                .setRequired(true)
                .setMaxLength(47)
                .setMinLength(47)
        ),

    async execute(interaction) {
        interaction.deferReply()
        const address = interaction.options.getString('address')

        const soulInfos = await getSouls(address);

        await interaction.editReply({embeds: createChooseSoulEmbed(address, soulInfos)});
    },
};

