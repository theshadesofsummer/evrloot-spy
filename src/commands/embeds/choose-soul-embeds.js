import {findClassEmote} from "../helpers/emotes.js";

const PAGE_SIZE = 5;

export function createChooseSoulsEmbed(soulInfos) {
    const embeds = [];
    for (let page = 0; page < soulInfos.length / PAGE_SIZE; page++) {
        embeds.push(createChooseSoulEmbed(soulInfos, page))
    }
    return embeds;
}

function createChooseSoulEmbed(soulInfos, page) {
    return {
        color: 0xba7cde,
        title: `Choose your soul!`,
        description: soulList(soulInfos, page),
        timestamp: new Date().toISOString(),
    };
}

function soulList(soulInfos, page) {
    let description = '';
    const firstElementIndex = page * PAGE_SIZE;

    const slicedSouls = soulInfos
        .slice(firstElementIndex, firstElementIndex + PAGE_SIZE)

    slicedSouls.forEach((soul, idx) => {
        description += `\`[${firstElementIndex + idx + 1}]\` ${findClassEmote(soul.metadata.properties['Soul Class'].value)} ${soul.metadata.name}\n`
    });

    return description;
}
