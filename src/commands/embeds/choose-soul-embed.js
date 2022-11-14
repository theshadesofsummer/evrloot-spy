import {findClassEmote} from "../helpers/emotes.js";

const PAGE_SIZE = 10;

export function createChooseSoulEmbed(soulInfos, page) {
    return [{
        color: 0xba7cde,
        title: `Choose your soul!`,
        author: {
            name: 'Soul-Info',
            icon_url: 'https://damnedpiratessociety.io/images/logo.png', // TODO: Pic of evrloot spy
        },
        description: soulList(soulInfos, page),
        timestamp: new Date().toISOString(),
    }];
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
