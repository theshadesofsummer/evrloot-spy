import {getBases, getBase64ImageLayer, getSoulInfo, getSoulMetadata} from "../../evrloot-api.js";
import {createSoulEmbed} from "../embeds/soul-embed.js";
import mergeImages from "merge-images";
import {Canvas, Image} from "canvas";

export const soulInfoSelectMenu = {
    async execute(interaction) {

        interaction.deferReply();
        const soulId = interaction.values[0];
        console.log(soulId);

        const metadata = await getSoulMetadata(soulId);

        //---

        const bases = await getBases();
        const soulInfo = await getSoulInfo(soulId);

        const soulResources = soulInfo.resources[0];

        const baseCollection = bases.find(base => base.id === soulResources.base)

        const partsIpfsSrcs = soulResources.parts.map(soulPartString =>
            baseCollection.parts.find(basePart => basePart.id === soulPartString)
        )

        const filteredPartsIpfsSrcs = partsIpfsSrcs
            .filter(part => part.src)
            .sort((part1, part2) => part1.z - part2.z)
            .map(part => part.src);

        const base64Images = filteredPartsIpfsSrcs.map(async ipfsLink =>
            await getBase64ImageLayer(ipfsLink.substring('ipfs://ipfs/'.length))
        );

        Promise.all(base64Images).then(base64Images => {
            mergeImages(base64Images, {
                Canvas: Canvas,
                Image: Image
            })
                .then(b64 => {
                    const base64content = Buffer.from(b64.substring(b64.indexOf(',')+1), 'base64')
                    interaction.editReply({
                        embeds: createSoulEmbed(metadata),
                        files: [
                            { attachment: base64content }
                        ]
                    })
                });
        });
    },
}