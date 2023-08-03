import { Buffer } from 'buffer'

export async function getSouls(address) {
    const walletInfo = await fetchAsync(`https://api.evrloot.xyz/api/evmnfts/evmwallet/${address}`);
    return walletInfo.evmSouls;
}

export async function getNft(nftId) {
    return await fetchAsync(`https://api.evrloot.xyz/api/evmnfts/${nftId}`);
}

export async function getFishingBoards(address) {
    const walletInfo = await fetchAsync(`https://api.evrloot.xyz/api/evmnfts/evmwallet/${address}`);
    return walletInfo.evmBoards;
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
