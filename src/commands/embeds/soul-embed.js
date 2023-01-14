export function createSoulEmbed(soulId, metadata, childNftsMetadata, experienceLevels, user) {
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
                value: statsFormatter(metadata, childNftsMetadata),
                inline: true
            },
            {
                name: 'Experience',
                value: experienceFormatter(experienceLevels),
                inline: true
            },
        ],
        timestamp: new Date().toISOString(),
    }];
}

function statsFormatter(metadata, childNftsMetadata) {
    let returnString = '';

    returnString += `*Strength*: ${getStatFormat(metadata.properties['Strength'].value, 8)} ${upgradedStat(childNftsMetadata, 'Strength')}\n`;
    returnString += `*Dexterity*: ${getStatFormat(metadata.properties['Dexterity'].value, 8)} ${upgradedStat(childNftsMetadata, 'Dexterity')}\n`;
    returnString += `*Intelligence*: ${getStatFormat(metadata.properties['Intelligence'].value, 8)} ${upgradedStat(childNftsMetadata, 'Intelligence')}\n`;
    returnString += `*Wisdom*: ${getStatFormat(metadata.properties['Wisdom'].value, 8)} ${upgradedStat(childNftsMetadata, 'Wisdom')}\n`;
    returnString += `*Fortitude*: ${getStatFormat(metadata.properties['Fortitude'].value, 8)} ${upgradedStat(childNftsMetadata, 'Fortitude')}\n`;
    returnString += `*Luck*: ${getStatFormat(metadata.properties['Luck'].value, 4)} ${upgradedStat(childNftsMetadata, 'Luck')}`;

    return returnString
}

function getStatFormat(stat, goodValue) {
    return stat >= goodValue ? `**${stat}**` : stat.toString();
}

function upgradedStat(childNftsMetadata, statType) {
    const effectingChildNftsMetadata = childNftsMetadata
        .filter(metadata => metadata.properties[statType])

    if (effectingChildNftsMetadata.length < 1) return ""

    const upgradeAmount = effectingChildNftsMetadata.reduce((acc, metadata) => acc + Number(metadata.properties[statType].value), 0)
    return `***+${upgradeAmount}***`;
}

function experienceFormatter(experienceLevels) {
    let returnString = '';

    for (const experienceLevel of experienceLevels) {
        returnString += `*${experienceLevel.skill}*: ${getRankName(experienceLevel.rank)} (${Math.round(experienceLevel.currentExp)}/${experienceLevel.nextLvl})\n`
    }

    return returnString;
}

function getRankName(rank) {
    const rankWords = rank.split(' ');
    return rankWords[rankWords.length-1];
}