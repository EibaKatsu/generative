import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import { addresses } from '../../src/utils/addresses';

import { abi as marathonTokenABI } from "../artifacts/contracts/marathonNouns/MarathonNounsToken.sol/MarathonNounsToken";

dotenv.config();


const marathonTokenAddress = addresses.MarathonNounsToken[network.name];

async function main() {

  let wallet;
  if(network.name == 'localhost'){
    [wallet] = await ethers.getSigners(); // localhost
  }else{
    const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
    wallet = new ethers.Wallet(privateKey, ethers.provider);

  }

  // ethers.Contract オブジェクトのインスタンスを作成
  const marathonToken = new ethers.Contract(marathonTokenAddress, marathonTokenABI, wallet);

  console.log("marathonToken:", marathonTokenAddress);

  for (var i: number = 0; i <= 3; i++) {
    try {
      const tx = await marathonToken.functions['mintMarathonNFT'](wallet.address, ethers.BigNumber.from( String(1)));
      console.log(`mint [`, i, `],tx=`,tx.hash);
    } catch (error) {
      console.log(`mint error [`, i, `]`, error);
    };
  }

}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
