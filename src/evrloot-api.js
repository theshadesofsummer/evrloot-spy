import { Buffer } from 'buffer'

export async function getSouls(address) {
    const nfts = await fetchAsync(`https://api.evrloot.xyz/api/nfts/wallet/${address}`);
    const souls = await nfts
        .filter(nft => nft.collection === "54bbd380dc3baaa27b-EVRSOULS")

    return await Promise.all(souls.map(async soul => ({
        ...soul,
        metadata: await getSoulMetadata(soul.id)
    })))
}

export async function getSoulMetadata(id) {
    return await fetchAsync(`https://api.evrloot.xyz/api/nfts/getMetadata/${id}`);
}

export async function getBases() {
    return await fetchAsync(`https://api.evrloot.xyz/api/bases`);
}

export async function getSoulInfo(id) {
    return await fetchAsync(`https://api.evrloot.xyz/api/nfts/${id}`);
}

async function fetchAsync(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
    }).then(json => {
        return json
    }).catch(error => console.log(error))
}

export async function getBase64ImageLayer(ipfsLink) {
    const link = `https://evrloot.mypinata.cloud/ipfs/${ipfsLink}`
    return await fetchAsyncBase64Image(link);
}

async function fetchAsyncBase64Image(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response
    })
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            const buf = Buffer.from(arrayBuffer)
            return 'data:image/png;base64,' + buf.toString('base64');
        })
        .catch(error => console.log(error))
}