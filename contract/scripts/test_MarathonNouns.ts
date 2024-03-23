import * as dotenv from 'dotenv';
import { ethers, network } from 'hardhat';
import { addresses } from '../../src/utils/addresses';

import { abi as marathonTokenABI } from '../artifacts/contracts/marathonNouns/MarathonNounsToken.sol/MarathonNounsToken';

dotenv.config();

const marathonTokenAddress = addresses.MarathonNounsToken[network.name];

async function main() {
  let wallet;
  if (network.name == 'localhost') {
    [wallet] = await ethers.getSigners(); // localhost
  } else {
    const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
    wallet = new ethers.Wallet(privateKey, ethers.provider);
  }

  // ethers.Contract オブジェクトのインスタンスを作成
  const marathonToken = new ethers.Contract(marathonTokenAddress, marathonTokenABI, wallet);

  console.log('marathonToken:', marathonTokenAddress);

  let tx;

  const record = {
    tokenId: 0,
    distance: '42.195km',
    grossTime: '4:02:11',
    netTime: '3:58:33',
    ranking: 2014,
  };

  try {
    for (var i: number = 0; i < 20; i++) {
      tx = await marathonToken.functions['mintMarathonNFT'](wallet.address, 1, record);
      console.log(`mint [`, i, `],tx=`, tx.hash);
    }
  } catch (error) {
    console.log(`mint error`, error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
