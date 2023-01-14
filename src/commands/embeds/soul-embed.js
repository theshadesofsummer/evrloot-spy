export function createSoulEmbed(soulId, metadata, user) {
    return [{
        color: 0xae1917,
        title: metadata.name,
        url: `https://singular.app/collectibles/kusama/54bbd380dc3baaa27b-EVRSOULS/${soulId}`,
        author: {
            name: `requested by ${user.username}`,
            icon_url: `https://game.evrloot.com/Soulclaim/${metadata.properties['Soul Class'].value.toLowerCase()}.png`,
        },
        fields: [
            {
                name: 'Personality',
                value: metadata.properties['Personality'].value,
                inline: true
            },
            {
                name: 'Talent',
                value: metadata.properties['Talent'].value,
                inline: true
            },
            {
                name: 'Origin',
                value: metadata.properties['Origin'].value,
                inline: true
            },
            // {
            //     name: 'Role',
            //     value: metadata['Role'].value,
            //     inline: true
            // },
            {
                name: 'Stats',
                value: statsFormatter(metadata),
            },
        ],
        timestamp: new Date().toISOString(),
    }];
}

function statsFormatter(metadata) {
    let returnString = '';

    returnString += `*Strength*: ${getStatFormat(metadata.properties['Strength'].value, 8)}\n`;
    returnString += `*Dexterity*: ${getStatFormat(metadata.properties['Dexterity'].value, 8)}\n`;
    returnString += `*Intelligence*: ${getStatFormat(metadata.properties['Intelligence'].value, 8)}\n`;
    returnString += `*Wisdom*: ${getStatFormat(metadata.properties['Wisdom'].value, 8)}\n`;
    returnString += `*Fortitude*: ${getStatFormat(metadata.properties['Fortitude'].value, 8)}\n`;
    returnString += `*Luck*: ${getStatFormat(metadata.properties['Fortitude'].value, 4)}`;

    return returnString
}

function getStatFormat(stat, goodValue) {
    return stat >= goodValue ? `**${stat}**` : stat.toString();
}