/*
npx hardhat run scripts/localNouns/setPrice_localNouns.ts --network mainnet
*/
// import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import { addresses } from '../../../src/utils/addresses';

import { abi as localTokenABI } from "../../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";
import { abi as localMinterABI } from "../../artifacts/contracts/localNouns/LocalNounsMinter.sol/LocalNounsMinter";

const localTokenAddress = addresses.localNounsToken[network.name];
const localMinterAddress = addresses.localNounsMinter[network.name];

async function main() {

  let wallet;
  if (network.name == 'localhost') {
    [wallet] = await ethers.getSigners(); // localhost
  } else {
    const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
    wallet = new ethers.Wallet(privateKey, ethers.provider);

  }

  // ethers.Contract オブジェクトのインスタンスを作成
  const localToken = new ethers.Contract(localTokenAddress, localTokenABI, wallet);
  const localMinter = new ethers.Contract(localMinterAddress, localMinterABI, wallet);

  let tx;

  tx = await localToken.functions['setTradeRoyalty'](ethers.utils.parseUnits("0.0015", "ether"));
  console.log("setTradeRoyalty:", tx.hash);
  await sleep(1000); // 1秒待機

  tx = await localMinter.functions['setMintPriceForSpecified'](ethers.utils.parseUnits("0.018", "ether"));
  console.log("setMintPriceForSpecified:", tx.hash);
  await sleep(1000); // 1秒待機

  tx = await localMinter.functions['setMintPriceForNotSpecified'](ethers.utils.parseUnits("0.006", "ether"));
  console.log("setMintPriceForNotSpecified:", tx.hash);
  await sleep(1000); // 1秒待機
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
