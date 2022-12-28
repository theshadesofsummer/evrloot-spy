import {SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder} from "discord.js";
import {Pagination, ExtraRowPosition} from "pagination.djs";
import {createChooseSoulsEmbed} from "./embeds/choose-soul-embeds.js";
import {getSouls} from "../evrloot-api.js";
import {findClassEmoteObject} from "./helpers/emotes.js";

export const paginationCommand = {
    data: new SlashCommandBuilder()
        .setName('pagination')
        .setDescription('DEV pagination'),

    async execute(interaction) {
        const soulInfoWithMetadata = await getSouls('HRQjjULBX3KPiH8TfW5SzvUAjPUR13TwJDpKZ1mpuF5RLMk');
        const embeds = createChooseSoulsEmbed(soulInfoWithMetadata);

        const pagination = new Pagination(interaction)
            .setEmbeds(embeds)
            .setEphemeral(true)

        const chooseSoulButtons = soulInfoWithMetadata.map((soulInfo, index) => ({
            label: `[${index+1}] ${soulInfo.metadata.name}`,
            value: soulInfo.id,
            emoji: findClassEmoteObject(soulInfo.metadata.properties['Soul Class'].value)
        }));
        const chooseSoulSelectMenu = new SelectMenuBuilder()
            .setCustomId("choose-soul-menu")
            .addOptions(chooseSoulButtons)
        const chooseActionRow = new ActionRowBuilder().setComponents(chooseSoulSelectMenu)
        pagination.addActionRows([chooseActionRow], ExtraRowPosition.Below);

        await pagination.render();

        // const address = '';
        // const soulInfoWithMetadata = await getSouls(address);
        // const message = await interaction.editReply({
        //     ephemeral: true,
        //     embeds: createChooseSoulEmbed(soulInfoWithMetadata, 0),
        //     components: createPaginationButtons(soulInfoWithMetadata, 0)
        // });
    },
};

function selectEmote() {

}