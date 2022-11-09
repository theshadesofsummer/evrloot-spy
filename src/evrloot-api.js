export async function getSouls(address) {
    const nfts = await fetchAsync(`https://api.evrloot.xyz/api/nfts/wallet/${address}`);
    const souls = await nfts
        .filter(nft => nft.collection === "54bbd380dc3baaa27b-EVRSOULS")
    
    const metadatas = [];
    for (let soul of souls) {
        metadatas.push(await getSoulInfo(soul.metadata))
    }
    return metadatas;
}

async function getSoulInfo(metadatalink) {
    const link = metadatalink.substring(metadatalink.indexOf("://")+3)
    const data = await fetchAsync(`https://evrloot.mypinata.cloud/${link}`);
    console.log("data: ", data);
    return data
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