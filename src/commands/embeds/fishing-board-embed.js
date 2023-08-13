export function createFishingBoardEmbed(fishingBoardId, user) {
    return [{
        color: 0xae1917,
        title: 'Fishing Board',
        author: {
            name: `requested by ${user.username}`,
        },
        timestamp: new Date().toISOString(),
    }];
}