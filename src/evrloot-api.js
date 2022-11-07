export async function getSouls(address) {
    return await fetchAsync(`https://api.evrloot.xyz/api/player-missions/unseen/${address}`);
}

async function fetchAsync(url) {
    return fetch(url).then(async response => {
        const text = await response.json();
        return text
    }).catch(error =>
        console.log(error)
    )
}