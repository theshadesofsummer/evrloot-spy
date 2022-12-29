export function createFishingBoardEmbed(user) {
    return [{
        color: 0xae1917,
        author: {
            name: `fishing board requested by ${user.username}`,
        },
        fields: [
            {
                name: 'Test',
                value: 'Value',
                inline: true
            },
        ],
        timestamp: new Date().toISOString(),
    }];
}