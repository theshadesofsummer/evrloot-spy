export function createSoulEmbed(soul, user) {

    return [{
        color: 0xae1917,
        title: soul.retrievedMetadata.name,
        url: `https://singular.app/collectibles/moonbeam/0x9d1454e198f4b601bfc0069003045b0cbc0e6749/${soul.tokenId}`,
        author: {
            name: `requested by ${user.username}`,
            icon_url: `https://game.evrloot.com/Soulclaim/${getProperty(soul, 'Soul Class').toLowerCase()}.png`,
        },
        thumbnail: {
            url: soul.retrievedMetadata.image
        },
        fields: [
            {
                name: 'Personality',
                value: getProperty(soul, 'Personality'),
                inline: true
            },
            {
                name: 'Talent',
                value: getProperty(soul, 'Talent'),
                inline: true
            },
            {
                name: 'Origin',
                value: getProperty(soul, 'Origin'),
                inline: true
            },
            {
                name: 'Condition',
                value: getProperty(soul, 'Condition'),
                inline: true
            },
            // {
            //     name: 'Role',
            //     value: metadata['Role'].value,
            //     inline: true
            // },
            {
                name: 'Stats',
                value: statsFormatter(soul),
                inline: true
            },
            // {
            //     name: 'Experience',
            //     value: experienceFormatter(soul.experience),
            //     inline: true
            // },
        ],
        timestamp: new Date().toISOString(),
    }];
}

function statsFormatter(soul) {
    return `*Strength*: ${getStatFormat(getProperty(soul, 'Strength'), 8)} ${upgradedStat(soul.children, 'Strength')}\n` +
            `*Dexterity*: ${getStatFormat(getProperty(soul, 'Dexterity'), 8)} ${upgradedStat(soul.children, 'Dexterity')}\n` +
            `*Intelligence*: ${getStatFormat(getProperty(soul, 'Intelligence'), 8)} ${upgradedStat(soul.children, 'Intelligence')}\n` +
            `*Wisdom*: ${getStatFormat(getProperty(soul, 'Wisdom'), 8)} ${upgradedStat(soul.children, 'Wisdom')}\n` +
            `*Fortitude*: ${getStatFormat(getProperty(soul, 'Fortitude'), 8)} ${upgradedStat(soul.children, 'Fortitude')}\n` +
            `*Luck*: ${getStatFormat(getProperty(soul, 'Luck'), 4)} ${upgradedStat(soul.children, 'Luck')}`;
}

function getProperty(soul, attribute) {
    return soul.retrievedMetadata.properties[attribute].value
}

function getStatFormat(stat, goodValue) {
    return stat >= goodValue ? `**${stat}**` : stat.toString();
}

function upgradedStat(soulChildren, statType) {
    const effectingChildNfts = soulChildren
        .filter(childNft => childNft.retrievedMetadata.properties[statType])

    if (effectingChildNfts.length < 1) return ""

    const upgradeAmount = effectingChildNfts.reduce((acc, childNft) => acc + Number(childNft.retrievedMetadata.properties[statType].value), 0)
    return `***+${upgradeAmount}***`;
}

// currently paused due to missing properties
// function experienceFormatter(soulExperience) {
//     const validActivities = soulExperience.activities.filter(activity => activity.activityId !== 0) // activity with id 0 is called unknown kek
//
//     let returnString = '';
//     for (const activity of validActivities) {
//         returnString += `*${activity.activityName}*: ${getRankName(experienceLevel.rank)} (${Math.round(experienceLevel.currentExp)}/${experienceLevel.nextLvl})\n`
//     }
//
//     return returnString;
// }
//
// function getRankName(rank) {
//     const rankWords = rank.split(' ');
//     return rankWords[rankWords.length-1];
// }