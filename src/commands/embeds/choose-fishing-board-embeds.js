const PAGE_SIZE = 5;

export function createChooseFishingBoardEmbeds(fishingBoards) {
    const embeds = [];
    for (let page = 0; page < fishingBoards.length / PAGE_SIZE; page++) {
        embeds.push(createChooseFishingBoardEmbed(fishingBoards, page))
    }
    return embeds;
}

function createChooseFishingBoardEmbed(fishingBoards, page) {
    return {
        color: 0xae1917,
        title: `Choose your fishing board!`,
        description: fishingBoardList(fishingBoards, page),
        timestamp: new Date().toISOString(),
    };
}

function fishingBoardList(fishingBoards, page) {
    let description = '';
    const firstElementIndex = page * PAGE_SIZE;

    const slicedFishingBoards = fishingBoards
        .slice(firstElementIndex, firstElementIndex + PAGE_SIZE)

    slicedFishingBoards.forEach((fishingBoard, idx) => {
        description += `\`[${firstElementIndex + idx + 1}]\` ${fishingBoard.metadata.name} (${fishingBoard.fishAmount}/24)\n`
    });

    return description;
}
