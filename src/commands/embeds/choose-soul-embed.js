import {findClassEmote} from "../helpers/emotes.js";

export function createChooseSoulEmbed(address, soulInfos) {
    return [{
        color: 0xba7cde,
        title: `Choose your soul!`,
        author: {
            name: 'Soul-Info',
            icon_url: 'https://damnedpiratessociety.io/images/logo.png', // TODO: Pic of evrloot spy
        },
        description: soulList(soulInfos),
        timestamp: new Date().toISOString(),
    }];
}

function soulList(soulInfos) {
    let description = '';
    soulInfos.forEach((soul, idx) => {
        description += `\`[${idx+1}]\` ${findClassEmote(soul.metadata.properties['Soul Class'].value)} ${soul.metadata.name}\n`
    });
    return description;
}
