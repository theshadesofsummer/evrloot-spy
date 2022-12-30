import {geNftInfo, getBase64ImageLayer, getBases} from "../../evrloot-api.js";
import mergeImages from "merge-images";
import {Canvas, Image} from "canvas";
import {createFishingBoardEmbed} from "../embeds/fishing-board-embed.js";
import sharp from 'sharp';

export const fishingBoardSelectMenu = {
    async execute(interaction) {
        interaction.deferReply();
        const fishingBoardId = interaction.values[0];

        console.log('requested', fishingBoardId, 'by', interaction.message.interaction.user.username);

        const bases = await getBases();
        const fishingBoardInfo = await geNftInfo(fishingBoardId);

        const fishingBoardResources = fishingBoardInfo.resources[0];
        const baseCollection = bases.find(base => base.id === fishingBoardResources.base)
        const partsIpfsSrcs = fishingBoardResources.parts.map(fishingBoardPartString =>
            baseCollection.parts.find(basePart => basePart.id === fishingBoardPartString)
        ).filter(partsIpfsSrc => !fishingBoardInfo.children.some(childNft => childNft.equipped.endsWith(partsIpfsSrc.id)))

        const childNftsIpfsSrcs = fishingBoardInfo.children.map(async childNft => await prepareChildIpfsLink(childNft, bases))

        await Promise.all(childNftsIpfsSrcs).then(childNftsIpfsSrcs => partsIpfsSrcs.push(...childNftsIpfsSrcs))

        const filteredPartsIpfsSrcs = partsIpfsSrcs
            .filter(part => part.src)
            .sort((part1, part2) => part1.z - part2.z)
            .map(part => part.src);

        const base64Images = filteredPartsIpfsSrcs
            .map(async ipfsLink => await getBase64ImageLayer(ipfsLink.substring('ipfs://ipfs/'.length)))

        Promise.all(base64Images)
            .then(base64Images => {
                mergeImages(base64Images, {
                    Canvas: Canvas,
                    Image: Image,
                })
                    .then(b64 => {
                        const base64content = Buffer.from(b64.substring(b64.indexOf(',') + 1), 'base64')
                        sharp(base64content).resize(1920, 1080).png().toBuffer().then(scaledBase64Content =>
                            interaction.editReply({
                                embeds: createFishingBoardEmbed(interaction.message.interaction.user),
                                files: [
                                    {attachment: scaledBase64Content}
                                ]
                            })
                        )

                    });
            });
    },
}

async function prepareChildIpfsLink(childNft, bases) {
    if (childNft.equipped === '') return {}

    const equipInfo = childNft.equipped.split('.');
    const baseId = equipInfo[0];
    const slotId = equipInfo[1];

    const baseCollection = bases.find(base => base.id === baseId)
    const slot = baseCollection.parts.find(basePart => basePart.id === slotId)

    const childNftInfo = await geNftInfo(childNft.id);
    const resource = childNftInfo.resources.find(resource => resource.slot === childNft.equipped)

    return {
        z: slot.z,
        src: resource.src
    }
}