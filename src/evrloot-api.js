export async function getSouls(address) {
    const nfts = await fetchAsync(`https://api.evrloot.xyz/api/nfts/wallet/${address}`);
    return nfts
        .filter(nft => nft.collection === "54bbd380dc3baaa27b-EVRSOULS")
        .map(async soul => await getSoulInfo(soul.id));
}

async function getSoulInfo(id) {
    const soulInfo = await fetchAsync(`https://api.evrloot.xyz/api/nfts/${id}`)
    console.log(soulInfo);
    return soulInfo;
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