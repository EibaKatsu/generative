// import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import { addresses } from '../../src/utils/addresses';

const nounsDescriptor = addresses.nounsDescriptor[network.name];

import { abi as localTokenABI } from "../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";
import { abi as tokenGateABI } from "../artifacts/contracts/libs/AssetTokenGate.sol/AssetTokenGate";

const localTokenAddress = addresses.localNounsToken[network.name];
const tokenGateAddress = addresses.tokenGate[network.name];

async function main() {

  let wallet;
  if (network.name == 'localhost') {
    [wallet] = await ethers.getSigners(); // localhost
  } else {
    const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
    wallet = new ethers.Wallet(privateKey, ethers.provider);

  }

  // ethers.Contract オブジェクトのインスタンスを作成
  const tokenGate = new ethers.Contract(tokenGateAddress, tokenGateABI, wallet);
  const localToken = new ethers.Contract(localTokenAddress, localTokenABI, wallet);

  let tx;
  // tokengateに設定
  if (network.name == 'mumbai') {
    const nfts = [
      "0x9f3aBc7b9f17Fb58a367bdA86e6129a2F5849942"  // TEST用
    ];
    tx = await tokenGate.functions['setWhitelist'](nfts);
  } else {
    const nfts = [
      "0x898a7dBFdDf13962dF089FBC8F069Fa7CE92cDBb", // NDJ-PFP
      "0x866648Ef4Dd51e857cA05ea200eD5D5D0c6f93Ce", // NDJ-POAP
      "0x09d53609a3709BBc1206B9Aa8C54DC71625e31aC", // Nounish CNP
      "0x4bE962499cE295b1ed180F923bf9c73b6357DE80"  // pNouns
    ];
    tx = await tokenGate.functions['setWhitelist'](nfts);
  }
  console.log("tokengate設定", tx.hash);

  // ロイヤリティ設定
  const rolyaltyAddresses = [
    '0xA0B9D89F6d17658EAA71fC0b916fCCB248340382', // 運営
    '0xBE5f70E61D00acFb8Ba934551103387EE9fd3dB2' // eiba
  ];
  const rolyaltyRatio = [
    5, // 運営
    5  // eiba
  ];
  tx = await localToken.functions['setRoyaltyAddresses'](rolyaltyAddresses, rolyaltyRatio);
  console.log("ロイヤリティ設定", tx.hash);

  // 運営用初期ミント
  // 300体を都道府県割合で運用へミント
  const mintNumForPrefecture = [

    [28, 2],
    [1, 2],
    [40, 2],
    [22, 2],
    [8, 2],
    [34, 2],
    [26, 2],
    [4, 2],
    [15, 2],
    [37, 2],
    [5, 2],
    [30, 2],
    [19, 2],
    [41, 2],
    [18, 2],
    [36, 2],
    [39, 2],
    [32, 2],
    [31, 2],
    [20, 2],
    [21, 2],
    [10, 2],
    [9, 2],
    [33, 2],
    [7, 2],
    [24, 2],
    [43, 2],
    [46, 2],
    [47, 2],
    [25, 2],
    [35, 2],
    [29, 2],
    [38, 2],
    [42, 2],
    [2, 2],
    [3, 1],
    [17, 1],
    [44, 1],
    [45, 1],
    [6, 1],
    [16, 1],
    [13, 2],
    [14, 2],
    [27, 2],
    [23, 2],
    [11, 2],
    [12, 2],

    // [28, 9],
    // [1, 9],
    // [40, 9],
    // [22, 8],
    // [8, 8],
    // [34, 8],
    // [26, 8],
    // [4, 8],
    // [15, 8],
    // [37, 4],
    // [5, 4],
    // [30, 4],
    // [19, 4],
    // [41, 4],
    // [18, 4],
    // [36, 4],
    // [39, 4],
    // [32, 4],
    // [31, 4],
    // [20, 7],
    // [21, 7],
    // [10, 7],
    // [9, 6],
    // [33, 6],
    // [7, 6],
    // [24, 6],
    // [43, 6],
    // [46, 6],
    // [47, 6],
    // [25, 6],
    // [35, 6],
    // [29, 5],
    // [38, 5],
    // [42, 5],
    // [2, 5],
    // [3, 5],
    // [17, 5],
    // [44, 5],
    // [45, 5],
    // [6, 5],
    // [16, 5],
    // [13, 10],
    // [14, 10],
    // [27, 10],
    // [23, 10],
    // [11, 10],
    // [12, 10],
  ];

  for (var i = 0; i < mintNumForPrefecture.length; i++) {
    try {
      tx = await localToken.functions['ownerMint']([wallet.address], [mintNumForPrefecture[i][0]], [mintNumForPrefecture[i][1]]);
      console.log("mint:", mintNumForPrefecture[i], tx.hash);
    } catch (error) {
      console.log("mint error:", mintNumForPrefecture[i], tx.hash);
      // console.error(error);  
    };
    await sleep(1000); // 1秒待機
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
