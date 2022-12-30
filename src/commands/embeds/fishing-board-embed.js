export function createFishingBoardEmbed(user) {
    return [{
        color: 0xae1917,
        author: {
            name: `fishing board requested by ${user.username}`,
        },
        timestamp: new Date().toISOString(),
    }];
}