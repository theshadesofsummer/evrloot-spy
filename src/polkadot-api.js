import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');

ApiPromise
    .create({provider: wsProvider})
    .then(async (api) => {
        console.log(api.genesisHash.toHex());

        // console.log(api.consts.babe.epochDuration.toString());
        // console.log(api.consts.balances.existentialDeposit.toString());

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

        /* 4. Multi Subscriptions */
        /*
        // same types
        const validatorKeys = await api.query.staking.validators.keys();
        const unsub = await api.query.balances.account.multi(validatorKeys, (balances) => {
            console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
        });

        // distinct types
        const unsub = await api.queryMulti([
            api.query.timestamp.now,
            [api.query.system.account, summersAddy]
        ], ([now, { nonce, data: balance }]) => {
            console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
        });
        */

        /* 5. Query Extras */
        /*
        const lastHdr = await api.rpc.chain.getHeader();
        // .at() only for the last 256 blocks
        const apiAt = await api.at(lastHdr.hash);
        const { data: { free } } = await apiAt.query.system.account(summersAddy);
        console.log(`The current free is ${free.toString()}`);

        const activeEra = await api.query.staking.activeEra();
        const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);
        exposures.forEach(([key, exposure]) => {
            console.log('key arguments:', key.args.map((k) => k.toHuman()));
            console.log('     exposure:', exposure.toHuman());
        });

        api.query.contracts.ownerInfoOf('90c6619c6b94fcfd34-EVRLOOT_FISHING')

        const [entryHash, entrySize] = await Promise.all([
            api.query.system.account.hash(summersAddy),
            api.query.system.account.size(summersAddy)
        ]);
        console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);

        const { meta, method, section } = api.query.system.account;
        console.log(`${section}.${method}: ${meta.docs.join(' ')}`);
        console.log(`query key: ${api.query.system.account.key(summersAddy)}`);
        */

        // const res = await api.query.assets.asset('' ,'EVRLT14nteG7mp31N4cmTTpYdDnjxEr25zQwXKC3Suph6L2')
        // console.log(res.toHuman());


    })


