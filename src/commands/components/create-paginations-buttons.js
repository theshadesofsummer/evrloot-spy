import {ActionRowBuilder, ButtonBuilder} from "@discordjs/builders";
import {ButtonStyle} from "discord-api-types/v10";

export function createPaginationButtons(soulInfosWithMetadata) {
    /*const buttonRow = new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder()
                .setCustomId('left')
                .setLabel('Last Page')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('right')
                .setLabel('Next Page')
                .setStyle(ButtonStyle.Primary)
        );*/

    return [...createSoulButtons(soulInfosWithMetadata)]
}

function createSoulButtons(soulInfosWithMetadata) { //max 5 per row, max 4 rows
    const soulButtons = soulInfosWithMetadata.map((soulInfosWithMetadata, idx) => new ButtonBuilder()
        .setCustomId(soulInfosWithMetadata.id)
        .setLabel(`[${idx+1}] ${soulInfosWithMetadata.metadata.name}`)
        .setStyle(ButtonStyle.Secondary)
    );

    const soulButtonRows = [];
    for (let count = 0; count < soulButtons.length; count += 5) {
        const remainingRowButtons = soulButtons.length - count;
        const buttonsForOneRow = soulButtons.slice(count, count + Math.min(5, remainingRowButtons));
        const soulButtonRow = new ActionRowBuilder()
            .setComponents(buttonsForOneRow)

        soulButtonRows.push(soulButtonRow);
    }
    return soulButtonRows;
}