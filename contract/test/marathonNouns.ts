import { expect } from 'chai';
import { ethers, network, SignerWithAddress, Contract } from "hardhat";
import { addresses } from '../../src/utils/addresses';
import { ethers } from 'ethers';
import { abi as marathonProviderABI } from "../artifacts/contracts/marathonNouns/MarathonNounsProvider.sol/MarathonNounsProvider";
import { abi as marathonDescriptorABI } from "../artifacts/contracts/marathonNouns/MarathonNounsDescriptor.sol/MarathonNounsDescriptor";
import { abi as marathonTokenABI } from "../artifacts/contracts/marathonNouns/MarathonNounsToken.sol/MarathonNounsToken";

let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, user3: SignerWithAddress, user4: SignerWithAddress, user5: SignerWithAddress, admin: SignerWithAddress, developper: SignerWithAddress;
let token: Contract, descriptor: Contract, provider: Contract;

const nounsDescriptorAddress = addresses.nounsDescriptor[network.name];
const MarathonNounsDescriptorAddress = addresses.MarathonNounsDescriptor[network.name];
const MarathonNounsProviderAddress = addresses.MarathonNounsProvider[network.name];
const MarathonNounsTokenAddress = addresses.MarathonNounsToken[network.name];

const zeroAddress = '0x0000000000000000000000000000000000000000';

before(async () => {
    /* `npx hardhat node`実行後、このスクリプトを実行する前に、Nouns,MarathonNounsの関連するコントラクトを
     * デプロイする必要があります。(1~5は一度実行すると、node停止までは再実施する必要なし)

         ## Termnal 1
        1 export NODE_OPTIONS=--max-old-space-size=4096 
        2 npx hardhat node

         ## Termnal 2
        3 cd contract
        4 npx hardhat run scripts/deploy_nounsDescriptorV1.ts
        5 npx hardhat run scripts/populate_nounsV1.ts
         
        6 npx hardhat run scripts/deploy_marathonNouns.ts
        7 npx hardhat run scripts/populate_marathonNouns.ts

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

});

describe('descriptor test', function () {
    let result, tx;

    it('head parts', async function () {
        // populateで一つだけ登録している
        const [count] = await descriptor.functions.headCount();
        expect(count.toNumber()).to.equal(1); 

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

describe('provider test', function () {
    let result, tx;

    it('provider', async function () {
        // eventIdの取得
        const [eventId] = await provider.functions.getEventId(1000000001);
        expect(eventId.toNumber()).to.equal(1); 

        const [eventId2] = await provider.functions.getEventId(21000054321);
        expect(eventId2.toNumber()).to.equal(21); 

        const [traits] = await provider.functions.generateTraits(1000000001);
        expect(traits).to.equal('{"trait_type": "head" , "value":"Raicho"}'); 

        const [svgData] = await provider.functions.generateSVGPart(1000000001);
        console.log("svgData",svgData);

    });
});

