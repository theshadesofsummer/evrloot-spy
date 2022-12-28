export function createSoulEmbed(metadata) {
    return [{
        color: 0x1d7907,
        author: {
            name: metadata.name,
            icon_url: `https://game.evrloot.com/Soulclaim/${metadata.properties['Soul Class'].value.toLowerCase()}.png`,
        },
        description: metadata.description,
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
                name: 'Strength',
                value: metadata.properties['Strength'].value,
                inline: true
            },
            {
                name: 'Dexterity',
                value: metadata.properties['Dexterity'].value,
                inline: true
            },
            {
                name: 'Intelligence',
                value: metadata.properties['Intelligence'].value,
                inline: true
            },
            {
                name: 'Wisdom',
                value: metadata.properties['Wisdom'].value,
                inline: true
            },
            {
                name: 'Fortitude',
                value: metadata.properties['Fortitude'].value,
                inline: true
            },
            {
                name: 'Luck',
                value: metadata.properties['Luck'].value,
                inline: true
            },
        ],
        timestamp: new Date().toISOString(),
    }];
}