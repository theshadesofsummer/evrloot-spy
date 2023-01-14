export function createFishingBoardEmbed(fishingBoardId, user) {
    return [{
        color: 0xae1917,
        title: 'Fishing Board',
        url: `https://singular.app/collectibles/kusama/54bbd380dc3baaa27b-EVRLOOT/${fishingBoardId}`,
        author: {
            name: `requested by ${user.username}`,
        },
        timestamp: new Date().toISOString(),
    }];
}