import {ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder} from "discord.js";
import {createChooseFishingBoardEmbeds} from "./embeds/choose-fishing-board-embeds.js";
import {ExtraRowPosition, Pagination} from "pagination.djs";
import {findClassEmoteObject} from "./helpers/emotes.js";
import {getFishingBoards} from "../evrloot-api.js"

export const fishingBoardCommand = {
    data: new SlashCommandBuilder()
        .setName('fishing-board')
        .setDescription('Show of your fishing board to others!')
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
        const fishingBoardNfts = await getFishingBoards(address);

        const sortedFishingBoards = fishingBoardNfts
            .map(fishingBoard => {
                return {
                    ...fishingBoard,
                    fishAmount: getAmountOfFishes(fishingBoard)
                }
            }).sort((fishingBoard1, fishingBoard2) =>
                fishingBoard2.fishAmount - fishingBoard1.fishAmount
            )

        const embeds = createChooseFishingBoardEmbeds(sortedFishingBoards);

        const pagination = new Pagination(interaction)
            .setEmbeds(embeds)
            .setEphemeral(true)
            .addActionRows([createFishingBoardSelectMenuRow(sortedFishingBoards)], ExtraRowPosition.Below);

        await pagination.render();
    },
};

function getAmountOfFishes(fishingBoardNft) {
    return fishingBoardNft.children.filter(child => child.equipped.startsWith("base-14389323-Fishing_Board.fish_")).length
}

function createFishingBoardSelectMenuRow(fishingBoards) {
    const chooseFishingBoardButtons = fishingBoards.map((fishingBoard, index) => ({
        label: `[${index+1}] Fishing Board (${fishingBoard.fishAmount}/24)`,
        value: fishingBoard.id,
    }));
    const chooseSoulSelectMenu = new SelectMenuBuilder()
        .setCustomId("choose-fishing-board-menu")
        .addOptions(chooseFishingBoardButtons)
    return new ActionRowBuilder().setComponents(chooseSoulSelectMenu)
}