import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import * as fs from 'fs';

import { images, palette } from "../test/image-local-data";
import { abi as localSeederABI } from "../artifacts/contracts/localNouns/LocalNounsSeeder.sol/LocalNounsSeeder";
import { abi as localNounsDescriptorABI } from "../artifacts/contracts/localNouns/LocalNounsDescriptor.sol/LocalNounsDescriptor";
import { abi as localProviderABI } from "../artifacts/contracts/localNouns/LocalNounsProvider.sol/LocalNounsProvider";
import { abi as localTokenABI } from "../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";

dotenv.config();

const localSeederAddress: string = '0x91cf7ca55343e351dA144AE19aC0E4a3A51292F0';
const localNounsDescriptorAddress: string = '0xefd772fD83Eaa8A32FC7Cfd191B8097C0e426F60';
const localProviderAddress: string = '0x775b0a3bE54711cD24681913C62bf3B5ed50049f';
const localTokenAddress: string = '0x8a224955904fE5aa454FaD3E668df8De7616A113';

async function main() {
  const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
  const wallet = new ethers.Wallet(privateKey, ethers.provider);
  // const [wallet] = await ethers.getSigners(); // localhost

  // ethers.Contract オブジェクトのインスタンスを作成
  const localSeeder = new ethers.Contract(localSeederAddress, localSeederABI, wallet);
  const localNounsDescriptor = new ethers.Contract(localNounsDescriptorAddress, localNounsDescriptorABI, wallet);
  const localProvider = new ethers.Contract(localProviderAddress, localProviderABI, wallet);
  const localToken = new ethers.Contract(localTokenAddress, localTokenABI, wallet);

  if (false) {
    // set Palette
    console.log(`set Palette start`);
    await localNounsDescriptor.addManyColorsToPalette(0, palette);
    console.log(`set Palette end`);

    // set Accessories
    console.log(`set Accessories start`);
    const accessoryChunk = chunkArrayByPrefectureId(images.accessories);
    for (const chunk of accessoryChunk) {
      const prefectureId = chunk[0].filename.split('-')[0];
      await localNounsDescriptor.addManyAccessories(prefectureId, chunk.map(({ data }) => data));
      // console.log("chunk:", prefectureId, chunk);
    }
    console.log(`set Accessories end`);

    // set Heads
    console.log(`set Heads start`);
    const headChunk = chunkArrayByPrefectureId(images.heads);
    for (const chunk of headChunk) {
      const prefectureId = chunk[0].filename.split('-')[0];
      await localNounsDescriptor.addManyHeads(prefectureId, chunk.map(({ data }) => data));
      // console.log("chunk:", prefectureId, chunk);
    }
    console.log(`set Heads end`);

  }

  console.log(`mint start`);
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(16), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(1), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(13), { value: ethers.utils.parseEther('0.001') });
  console.log(`mint end`);
  
  const seed = {
    background: 1,
    body: 0,
    accessory: 1,
    head: 1,
    glasses: 11
  }

  // console.log(`palletLength`, await localNounsDescriptor.palletLength(0));
  const ind = 3;
  console.log(`parts`, await localNounsDescriptor.test(seed,ind));
  // console.log(`decodeRLEImageTest`, await localNounsDescriptor.decodeRLEImageTest(seed,ind));

  const decodedImage = await localNounsDescriptor.decodeRLEImageTest(seed,ind);
  console.log("decodedImage2:",decodedImage[2]);
  // const rects = decodedImage[0].rects;
  // console.log("rects:",rects);
  // for(var i=0; i<rects.length; i++){
  //   console.log("rect[",i,"]:",decodedImage.rects[i]);
  // }

  console.log(`generateSVGImageTest`, await localNounsDescriptor.generateSVGImageTest(seed,ind));

  // return;
  console.log(`write file start`);
  const index = 0;
  const ret = await localToken.tokenURI(index);
  const json = Buffer.from(ret.split(",")[1], 'base64').toString();
  const svgB = Buffer.from(JSON.parse(json)["image"].split(",")[1], 'base64').toString();
  const svg = Buffer.from(svgB, 'base64').toString();
  fs.writeFileSync(`./svg/${index}.svg`, svg, { encoding: 'utf8' });
  console.log(`write file end`);

}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

interface ImageData {
  filename: string;
  data: string;
}

function chunkArrayByPrefectureId(imagedata: ImageData[]): ImageData[][] {
  let map = new Map<string, ImageData[]>();

  for (let i = 0; i < imagedata.length; i++) {
    // dataが空っぽはスキップ
    if (imagedata[i].data === undefined) {
      console.error("not define data:", imagedata[i].filename);
      continue;
    }

    let id = imagedata[i].filename.split('-')[0];

    // 12までは登録したのでスキップ
    // if(Number(id) <= 12){
    //   continue;
    // }

    if (!map.has(id)) {
      map.set(id, []);
    }
    map.get(id)!.push(imagedata[i]);
  }
  return Array.from(map.values());
}
