import {ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder} from "discord.js";
import {createChooseSoulEmbeds} from "./embeds/choose-soul-embeds.js";
import {ExtraRowPosition, Pagination} from "pagination.djs";
import {findClassEmoteObject} from "./helpers/emotes.js";
import {getSouls} from "../evrloot-api.js"

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
        interaction.deferReply({
            ephemeral: true
        })
        const address = interaction.options.getString('address')
        const soulInfoWithMetadata = await getSouls(address);

        const embeds = createChooseSoulEmbeds(soulInfoWithMetadata);

        const pagination = new Pagination(interaction)
            .setEmbeds(embeds)
            .setEphemeral(true)
            .addActionRows([createSelectMenuRow(soulInfoWithMetadata)], ExtraRowPosition.Below);

        await pagination.render();
    },
};

function createSelectMenuRow(soulInfoWithMetadata) {
    const chooseSoulButtons = soulInfoWithMetadata.map((soulInfo, index) => ({
        label: `[${index+1}] ${soulInfo.metadata.name}`,
        value: soulInfo.id,
        emoji: findClassEmoteObject(soulInfo.metadata.properties['Soul Class'].value)
    }));
    const chooseSoulSelectMenu = new SelectMenuBuilder()
        .setCustomId("choose-soul-menu")
        .addOptions(chooseSoulButtons)
    return new ActionRowBuilder().setComponents(chooseSoulSelectMenu)
}