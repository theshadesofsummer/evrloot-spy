export function createChooseSoulEmbed(address, soulInfos) {
    return [{
        color: 0xba7cde,
        title: `Choose your soul!`,
        author: {
            name: 'Evrloot Spy',
            icon_url: 'https://damnedpiratessociety.io/images/logo.png', // TODO: Pic of evrloot spy
        },
        description: soulList(soulInfos),
        timestamp: new Date().toISOString(),
    }];
}

function soulList(soulInfos) {
    let description = '';
    soulInfos.forEach((soul, idx) => {
        description += `\`[${idx}]\` ${findClassEmote(soul.properties['Soul Class'].value)} ${soul.name}\n`
    });
    return description;
}

function findClassEmote(soulClass) {
    return Classes.get(soulClass);
}

const Classes = new Map([
    ['Berserker', '<:berserker:1039914842183696444>'],
    ['Alchemist', '<:alchemist:1039914840917037066>'],
    ['Ranger', '<:ranger:1039914843861430272>']
]);