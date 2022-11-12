export async function getSouls(address) {
    const nfts = await fetchAsync(`https://api.evrloot.xyz/api/nfts/wallet/${address}`);
    const souls = await nfts
        .filter(nft => nft.collection === "54bbd380dc3baaa27b-EVRSOULS")

    return await Promise.all(souls.map(async soul => ({
        ...soul,
        metadata: await getSoulInfo(soul.id)
    })))
}

export async function getSoulMetadata(id) {
    return await getSoulInfo(id)
}

async function getSoulInfo(id) {
    return await fetchAsync(`https://api.evrloot.xyz/api/nfts/getMetadata/${id}`);
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

