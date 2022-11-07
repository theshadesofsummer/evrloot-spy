import { SlashCommandBuilder } from "@discordjs/builders";
import {getSouls} from "../evrloot-api.js";

export const soulinfoCommand = {
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
        const address = interaction.options.getString('address')

        const data = await getSouls(address);


        await interaction.reply(`${address}`);
    },
};

