import {SlashCommandBuilder} from "@discordjs/builders";
import {getBases, getImageLayer, getOneRangerDev} from "../evrloot-api.js";

import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';

export const imageCommand = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('DEV: get image'),

    async execute(interaction) {
        await interaction.deferReply({
            ephemeral: true
        })


        const bases = await getBases();
        const ranger = await getOneRangerDev();

        const rangerRessources = ranger.resources[0];

        const baseCollection = bases.find(base => base.id === rangerRessources.base)

        const partsIpfsSrcs = rangerRessources.parts.map(rangerPartString =>
            baseCollection.parts.find(basePart => basePart.id === rangerPartString)
        )

        const filteredPartsIpfsSrcs = partsIpfsSrcs
            .filter(part => part.src)
            .sort((part1, part2) => part1.z - part2.z)
            .map(part => part.src);

        const base64Images = filteredPartsIpfsSrcs.map(async ipfsLink => {
            const imageResponse = await getImageLayer(ipfsLink.substring('ipfs://ipfs/'.length));
            return 'data:image/png;base64,' + imageResponse;
        });

        Promise.all(base64Images).then(base64Images => {
            console.log(base64Images[0].substring(0,100))
            mergeImages(base64Images, {
                Canvas: Canvas,
                Image: Image
            })
                .then(b64 => {
                    console.log(b64.substring(0,100))
                    console.log(b64.substring(b64.indexOf(',')+1).substring(0,100))
                    const buf = Buffer.from(b64.substring(b64.indexOf(',')+1), 'base64')
                    interaction.channel.send({
                        content: 'soul:',
                        files: [
                            { attachment: buf }
                        ]
                    });
                });
        });

        // base64Images[0].then(res => {
        //     console.log('started checking 0')
        //     const imgBuf = Buffer.from(res, 'base64');
        //     const attach = new AttachmentBuilder(imgBuf);
        //     console.log(attach)
        //     interaction.channel.send({content: 'hi;', files: [
        //             { attachment: imgBuf }
        //         ]});
        // });


        // const imgBuf = new Buffer.from(base64Images[0]);
        // const attach = new AttachmentBuilder(imgBuf);
        // await interaction.editReply(attach);

        // await interaction.editReply({
        //     ephemeral: true,
        //     content: 'finish',
        //
        // });
    },
};

