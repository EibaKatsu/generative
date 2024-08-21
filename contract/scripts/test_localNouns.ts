import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import { addresses } from '../../src/utils/addresses';
import * as fs from 'fs';
import sharp from 'sharp';

import { abi as localTokenABI } from "../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";

dotenv.config();

const localTokenAddress = addresses.localNounsToken[network.name];

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

  console.log("localToken:", localToken.address);

  for (var i: number = 0; i <= 87; i++) {
    try {

      const ret = await localToken.tokenURI(i);
      const json = Buffer.from(ret.split(",")[1], 'base64').toString();
      const svgB = Buffer.from(JSON.parse(json)["image"].split(",")[1], 'base64').toString();

      const attributes = JSON.parse(json)["attributes"];
      const result = extractPrefectureAndAccessory(attributes);

      var count = (i+1).toString();
      if(i+1 < 10){
          count = "0" + count;
      }
      
      fs.writeFileSync(`./test/svg/${count}_bonsai_${result.prefecture}_${result.accessory}.svg`, svgB);

      // SVGデータをPNGに変換して保存
      await sharp(Buffer.from(svgB))
        .png()
        .toFile(`./test/png/${count}_bonsai_${result.prefecture}_${result.accessory}.png`);

      console.log(`write file [`, i, `]`);
    } catch (error) {
      console.log(`write error [`, i, `]`);
      console.error(error);
    };
  }

}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

type Trait = {
  trait_type: string;
  value: string;
};

function extractPrefectureAndAccessory(traits: Trait[]): { prefecture: string | undefined, accessory: string | undefined } {

  const prefecture = traits.find(trait => trait.trait_type === 'prefecture')?.value;
  const accessory = traits.find(trait => trait.trait_type === 'accessory')?.value;

  return { prefecture, accessory };
}
