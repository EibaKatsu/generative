import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';
import * as fs from 'fs';

import { images, palette } from "../test/image-local-data";
import { abi as localSeederABI } from "../artifacts/contracts/localNouns/LocalNounsSeeder.sol/LocalNounsSeeder";
import { abi as localNounsDescriptorABI } from "../artifacts/contracts/localNouns/LocalNounsDescriptor.sol/LocalNounsDescriptor";
import { abi as localProviderABI } from "../artifacts/contracts/localNouns/LocalNounsProvider.sol/LocalNounsProvider";
import { abi as localTokenABI } from "../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";

dotenv.config();

const localSeederAddress: string = '0xE4A6cF234be1Df4e1079ce49dBD1D367bd57d79F';
const localNounsDescriptorAddress: string = '0x3cD10deE35259230BfdfAFA020B557Bc926F0E3A';
const localProviderAddress: string = '0x37a996A009c2De70756b8d81fC71099f8627373f';
const localTokenAddress: string = '0x548eEEDBD767cA553e7597421B3C52C5e20B0FE6';

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

  // for (var i:number = 1; i <= 47; i++) {
  //   console.log(i,":",ethers.BigNumber.from(i));
  //   await localToken.functions['mint(uint256)'](ethers.BigNumber.from(String(i)), { value: ethers.utils.parseEther('0.001') });
  //   console.log(`mint [`, i, `]`);
  // }

  // console.log(`mint start`);
  // await localToken.functions['mint(uint256)'](ethers.BigNumber.from(16), { value: ethers.utils.parseEther('0.001') });
  // await localToken.functions['mint(uint256)'](ethers.BigNumber.from(1), { value: ethers.utils.parseEther('0.001') });
  // await localToken.functions['mint(uint256)'](ethers.BigNumber.from(13), { value: ethers.utils.parseEther('0.001') });
  // console.log(`mint end`);


  // await localToken.functions['mint(uint256)'](ethers.BigNumber.from(1), { value: ethers.utils.parseEther('0.001') });
  // await localToken.functions['mint(uint256)'](ethers.BigNumber.from(2), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(3), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(4), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(5), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(6), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(7), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(8), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(9), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(10), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(11), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(12), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(13), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(14), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(15), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(16), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(17), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(18), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(19), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(20), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(21), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(22), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(23), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(24), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(25), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(26), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(27), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(28), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(29), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(30), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(31), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(32), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(33), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(34), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(35), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(36), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(37), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(38), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(39), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(40), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(41), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(42), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(43), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(44), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(45), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(46), { value: ethers.utils.parseEther('0.001') });
  await localToken.functions['mint(uint256)'](ethers.BigNumber.from(47), { value: ethers.utils.parseEther('0.001') });

  const seed = {
    background: 1,
    body: 0,
    accessory: 1,
    head: 1,
    glasses: 11
  }

  // return;
  // console.log(`write file start`);
  // const index = 0;
  // const ret = await localToken.tokenURI(index);
  // const json = Buffer.from(ret.split(",")[1], 'base64').toString();
  // const svgB = Buffer.from(JSON.parse(json)["image"].split(",")[1], 'base64').toString();
  // const svg = Buffer.from(svgB, 'base64').toString();
  // // fs.writeFileSync(`./svg/${index}.svg`, svg, { encoding: 'utf8' });
  // console.log(`write file end`);

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

    if (!map.has(id)) {
      map.set(id, []);
    }
    map.get(id)!.push(imagedata[i]);
  }
  return Array.from(map.values());
}
