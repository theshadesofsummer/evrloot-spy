import {getBases, getBase64ImageLayer, geNftInfo, getNftMetadata} from "../../evrloot-api.js";
import {createSoulEmbed} from "../embeds/soul-embed.js";
import mergeImages from "merge-images";
import {Canvas, Image} from "canvas";

export const soulInfoSelectMenu = {
    async execute(interaction) {
        interaction.deferReply();
        const soulId = interaction.values[0];

        console.log('requested', soulId, 'by', interaction.message.interaction.user.username);

        const metadata = await getNftMetadata(soulId);

        const bases = await getBases();
        const soulInfo = await geNftInfo(soulId);

        const soulResources = soulInfo.resources[0];
        const baseCollection = bases.find(base => base.id === soulResources.base)
        let partsIpfsSrcs = soulResources.parts.map(soulPartString =>
            baseCollection.parts.find(basePart => basePart.id === soulPartString)
        )

        console.log('before filter', partsIpfsSrcs)
        partsIpfsSrcs = partsIpfsSrcs.filter(partsIpfsSrc => !soulInfo.children.some(childNft => childNft.equipped.endsWith(partsIpfsSrc.id)))
        console.log('after filter', partsIpfsSrcs)

        const childNftsIpfsSrcs = soulInfo.children.map(async childNft => await prepareChildIpfsLink(childNft, bases))

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
                    Image: Image
                })
            .then(b64 => {
                const base64content = Buffer.from(b64.substring(b64.indexOf(',')+1), 'base64')
                interaction.editReply({
                    embeds: createSoulEmbed(metadata, interaction.message.interaction.user),
                    files: [
                        { attachment: base64content }
                    ]
                })
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