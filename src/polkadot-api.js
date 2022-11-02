import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');

ApiPromise
    .create({provider: wsProvider})
    .then(async (api) => {
        console.log(api.genesisHash.toHex());

        console.log(api.consts.babe.epochDuration.toString());
        console.log(api.consts.balances.existentialDeposit.toString());

        const summersAddy = 'Et8YLEjhpoDq6H1a9oJb9TeDPX93d7b2utiqzztREjZ81WC';

        /* 1. State queries */
        /*
        const now = await api.query.timestamp.now();
        const { nonce, data: balance } = await api.query.system.account(summersAddy);
        console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
        // or
        const [now2, { nonce2, data: balance2 }] = await Promise.all([
            api.query.timestamp.now(),
            api.query.system.account(summersAddy)
        ]);
        console.log(`${now2}: balance of ${balance2.free} and a nonce of ${nonce2}`);
        */


        /* 2. RPC Queries */
        /*
        const chain = await api.rpc.system.chain();
        const lastHeader = await api.rpc.chain.getHeader();
        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

        let headCount = 0;
        await api.rpc.chain.subscribeNewHeads((lastHeader) => {
            console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
            if(++headCount >= 10) {
                //no unsub method available, but don't need one for evrbot
            }
        });
        */

        /* 3. Query Subscriptions */
        /*const unsub = await api.query.timestamp.now((moment) => {
            console.log(`The last block has a timestamp of ${moment}`);
        });
        const unsub2 = await api.query.system.account(summersAddy, ({ nonce, data: balance }) => {
            console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
        });
        */

    })


