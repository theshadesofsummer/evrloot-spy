import {ActionRowBuilder, ButtonBuilder} from "@discordjs/builders";
import {ButtonStyle} from "discord-api-types/v10";

const PAGE_SIZE = 10

export function createPaginationButtons(soulInfosWithMetadata, page) {
    const buttonRow = new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder()
                .setCustomId('left')
                .setLabel('Last Page')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === 0),
            new ButtonBuilder()
                .setCustomId('right')
                .setLabel('Next Page')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === Math.floor((soulInfosWithMetadata.length-1)/10))
        );

    return [buttonRow, ...createSoulButtons(soulInfosWithMetadata, page)]
}

function createSoulButtons(soulInfosWithMetadata, page) { //max 5 per row, max 4 rows
    const firstElementIndex = page * PAGE_SIZE
    console.log('firstElementIndex', firstElementIndex)
    console.log('size', soulInfosWithMetadata.length)
    console.log('endSlice', firstElementIndex+10)
    console.log('slicedLength', soulInfosWithMetadata.slice(firstElementIndex, firstElementIndex+10).length)

    const slicedSouls = soulInfosWithMetadata.slice(firstElementIndex, firstElementIndex+10)
    const soulButtons = slicedSouls
        .map((soulInfosWithMetadata, idx) => new ButtonBuilder()
            .setCustomId(soulInfosWithMetadata.id)
            .setLabel(`[${idx+1}] ${soulInfosWithMetadata.metadata.name}`)
            .setStyle(ButtonStyle.Secondary)
        );

    console.log(soulButtons.length);

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