import { expect } from 'chai';
import { ethers, network, SignerWithAddress, Contract } from "hardhat";
import { addresses } from '../../src/utils/addresses';
import { ethers } from 'ethers';
import { abi as marathonProviderABI } from "../artifacts/contracts/marathonNouns/MarathonNounsProvider.sol/MarathonNounsProvider";
import { abi as marathonDescriptorABI } from "../artifacts/contracts/marathonNouns/MarathonNounsDescriptor.sol/MarathonNounsDescriptor";
import { abi as marathonTokenABI } from "../artifacts/contracts/marathonNouns/MarathonNounsToken.sol/MarathonNounsToken";
import { abi as eventStoreABI } from "../artifacts/contracts/marathonNouns/EventStore.sol/EventStore";

let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, user3: SignerWithAddress, user4: SignerWithAddress, user5: SignerWithAddress, admin: SignerWithAddress, developper: SignerWithAddress;
let token: Contract, descriptor: Contract, provider: Contract, eventStore: Contract;

const nounsDescriptorAddress = addresses.nounsDescriptor[network.name];
const MarathonNounsDescriptorAddress = addresses.MarathonNounsDescriptor[network.name];
const MarathonNounsProviderAddress = addresses.MarathonNounsProvider[network.name];
const MarathonNounsTokenAddress = addresses.MarathonNounsToken[network.name];
const EventStoreAddress = addresses.EventStore[network.name];

const zeroAddress = '0x0000000000000000000000000000000000000000';

before(async () => {
    /* `npx hardhat node`実行後、このスクリプトを実行する前に、Nouns,MarathonNounsの関連するコントラクトを
     * デプロイする必要があります。(1~6は一度実行すると、node停止までは再実施する必要なし)

         ## Termnal 1
        1 export NODE_OPTIONS=--max-old-space-size=4096 
        2 npx hardhat node

         ## Termnal 2
        3 cd contract
        4 npx hardhat run scripts/deploy_nounsDescriptorV1.ts
        5 npx hardhat run scripts/populate_nounsV1.ts
        6 npx hardhat run scripts/deploy_font.ts
         
        7 npx hardhat run scripts/deploy_marathonNouns.ts
        8 npx hardhat run scripts/populate_marathonNouns.ts

        note: `npx hardhat node`実行時にJavaScript heap out of memory が発生した場合は環境変数で使用メモリを指定する
        export NODE_OPTIONS=--max-old-space-size=4096

        # テスト実行
        # npx hardhat test test/marathonNouns.ts

     */

    [owner, user1, user2, user3, user4, user5, admin, developper] = await ethers.getSigners();

    // コントラクト定義
    descriptor = await ethers.getContractAt(marathonDescriptorABI, MarathonNounsDescriptorAddress);
    provider = await ethers.getContractAt(marathonProviderABI, MarathonNounsProviderAddress);
    token = await ethers.getContractAt(marathonTokenABI, MarathonNounsTokenAddress);
    eventStore = await ethers.getContractAt(eventStoreABI, EventStoreAddress);

});

describe('descriptor test', function () {
    let result, tx;

    it('head parts', async function () {
        // populateで一つだけ登録している
        const [count] = await descriptor.functions.headCount();
        expect(count.toNumber()).to.equal(2); 

        const [count1] = await descriptor.functions.headCountInEvent(1);
        expect(count1.toNumber()).to.equal(1); 

        const [count2] = await descriptor.functions.headInEvent(1,0);
        expect(count2.toNumber()).to.equal(0); 

        // headsの一つ目(populate_MarathonNouns.tsで設定したやつ)
        const headData = await descriptor.heads(0);
        expect(String(headData)).to.equal('0x00031d15021200047f05001100077f03001100047f020e017f010e02000600010f0a00077f020e0100050001dd010f01dd0800077f0400050001dd017e01dd010f0400097f0500017f0500017e01dd010f02000c7f04000100010e017f0200010f01dd017e107f03000100017f020e157f02000200177f02000200177f02000300167f02000300157f01dd010001dd010001dd0200137f010001dd010f01dd010001dd010f0200117f0100010f01dd017e010001dd017e010f01dd0300067f030e057f010001dd010f017e02dd0200017e01dd010f03000a7f040001dd017e0300010002dd017e010f0300027f0400027f0500010f017e02dd02000300010f037e0100027f010e0300027f010e0300027e010f0400'); 

        const headName = await descriptor.headsName(0);
        expect(String(headName)).to.equal('Raicho'); 
    });
});


describe('eventStore test', function () {
    let result, tx;

    it('eventStore', async function () {
        // eventStoreの登録
        const event = {
            eventId: 1,
            name: "Toyama Marathon",
            times: 8,
            date: "2023.11.05",
            year: "2023",
            organizer: "",
            background: "#AFEEEE",
          }
        await eventStore.functions.register(event);
        
        const [title] = await eventStore.functions.getTitle(1);
        expect(title).to.equal('8th Toyama Marathon, 2023'); 

        // eventStoreの登録
        const event2 = {
            eventId: 2,
            name: "Kanazawa Marathon",
            times: 0,
            date: "2023.10.29",
            year: "2023",
            organizer: "",
            background: "#FFCCD8",
          }
        await eventStore.functions.register(event2);
        
        const [title2] = await eventStore.functions.getTitle(2);
        expect(title2).to.equal('Kanazawa Marathon, 2024'); 

    });
});

describe('mint test', function () {
    let result, tx;

    it('mint', async function () {
        // timeRecordStoreの登録
        const record = {
            tokenId: 0,
            distance: "42.195km",
            grossTime: "4:00:00",
            netTime: "3:58:33",
            ranking: 2014,
        }
        await token.functions.mintMarathonNFT(owner.address, 1, record);

        // timeRecordStoreの登録
        const record2 = {
            tokenId: 0,
            distance: "42.195km",
            grossTime: "4:00:00",
            netTime: "3:58:33",
            ranking: 2014,
        }
        await token.functions.mintMarathonNFT(owner.address, 2, record2);

    });
});

describe('provider test', function () {
    let result, tx;

    it('provider', async function () {
        // eventIdの取得
        const [eventId] = await provider.functions.getEventId(1000000001);
        expect(eventId.toNumber()).to.equal(1); 

        // const [eventId2] = await provider.functions.getEventId(21000054321);
        // expect(eventId2.toNumber()).to.equal(21); 

        const [traits] = await provider.functions.generateTraits(2000000001);
        console.log('---- traits ------');
        console.log(traits);

        const [svgData] = await provider.functions.generateSVG(2000000001);
        console.log('---- 1 ------');
        console.log(svgData);

        const [svgData2] = await provider.functions.generateSVGPart(2000000001);
        console.log('---- 2 ------');
        console.log(svgData2);

    });

});

