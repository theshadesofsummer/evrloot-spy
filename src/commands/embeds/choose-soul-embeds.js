import {createChooseSoulEmbed} from "./choose-soul-embed.js";

const PAGE_SIZE = 5;

export function createChooseSoulsEmbed(soulInfos) {
    const embeds = [];
    for (let page = 0; page < soulInfos.length / PAGE_SIZE; page++) {
        embeds.push(createChooseSoulEmbed(soulInfos, page))
    }
    return embeds;
}