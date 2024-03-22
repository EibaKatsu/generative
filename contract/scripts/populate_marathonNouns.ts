import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';

import { abi as nounsDescriptorABI } from "../artifacts/contracts/marathonNouns/MarathonNounsDescriptor.sol/MarathonNounsDescriptor";
import { addresses } from '../../src/utils/addresses';
import { palette } from "../test/image-local-data";

dotenv.config();

const nounsDescriptorAddress = addresses.MarathonNounsDescriptor[network.name];

async function main() {
  var privateKey;
  if (network.name == "localhost" || network.name == "hardhat") {
    privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  } else {
    privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
  }
  const wallet = new ethers.Wallet(privateKey, ethers.provider);
  // const [wallet] = await ethers.getSigners(); // localhost

  // ethers.Contract オブジェクトのインスタンスを作成
  const nounsDescriptor = new ethers.Contract(nounsDescriptorAddress, nounsDescriptorABI, wallet);

  const feeData = await ethers.provider.getFeeData();
  console.log("feeData:" + feeData.gasPrice);

  let tx;
  if (true) {

    // set Palette
    // console.log(`set Palette start`);
    // await nounsDescriptor.addManyColorsToPalette(0, palette);
    // console.log(`set Palette end`);


    // 画像データ(eventId, data, name)
    const imageList = [
      // [1,'0x00031d15021200047f05001100077f03001100047f020e017f010e02000600010f0a00077f020e0100050001dd010f01dd0800077f0400050001dd017e01dd010f0400097f0500017f0500017e01dd010f02000c7f04000100010e017f0200010f01dd017e107f03000100017f020e157f02000200177f02000200177f02000300167f02000300157f01dd010001dd010001dd0200137f010001dd010f01dd010001dd010f0200117f0100010f01dd017e010001dd017e010f01dd0300067f030e057f010001dd010f017e02dd0200017e01dd010f03000a7f040001dd017e0300010002dd017e010f0300027f0400027f0500010f017e02dd02000300010f037e0100027f010e0300027f010e0300027e010f0400','Raicho'],
      [2,'0x000518150705a6076d05ea03a60b6d03a60aa6066d01ea09a6086d07a60a6d10a6016d11a611a604ea0da611a6046d0da609ea08a603ea056d09a60aea07a606ea036d01a603ea04a6036d07ea07a603ea03a60bea','Kinpaku'],
    ];

    console.log(`set heads start`);
    for(const image of imageList){
      tx = await nounsDescriptor.addHead(image[0],image[1],image[2], { gasPrice: feeData.gasPrice });
      console.log(image[0], image[2], tx.hash);
    }
    console.log(`set heads end`);

  }

}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

