import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';

import { addresses } from '../../src/utils/addresses';

const nounsDescriptor = addresses.nounsDescriptor[network.name];

import { images, palette } from "../test/image-local-data";
// import { abi as localSeederABI } from "../artifacts/contracts/localNouns/LocalNounsSeeder.sol/LocalNounsSeeder";
import { abi as localNounsDescriptorABI } from "../artifacts/contracts/localNouns/LocalNounsDescriptor.sol/LocalNounsDescriptor";
import { abi as localProviderABI } from "../artifacts/contracts/localNouns/LocalNounsProvider.sol/LocalNounsProvider";
import { abi as localTokenABI } from "../artifacts/contracts/LocalNounsToken.sol/LocalNounsToken";
import { abi as localMinterABI } from "../artifacts/contracts/localNouns/LocalNounsMinter.sol/LocalNounsMinter";

dotenv.config();

const localSeederAddress = addresses.localSeeder[network.name];
const localNounsDescriptorAddress = addresses.localNounsDescriptor[network.name];
const localProviderAddress = addresses.localProvider[network.name];
const localTokenAddress = addresses.localNounsToken[network.name];
const localMinterAddress = addresses.localNounsMinter[network.name];

async function main() {

  // const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : '';
  // const wallet = new ethers.Wallet(privateKey, ethers.provider);
  const [wallet] = await ethers.getSigners(); // localhost

  // ethers.Contract オブジェクトのインスタンスを作成
  // const localSeeder = new ethers.Contract(localSeederAddress, localSeederABI, wallet);
  const localNounsDescriptor = new ethers.Contract(localNounsDescriptorAddress, localNounsDescriptorABI, wallet);
  const localProvider = new ethers.Contract(localProviderAddress, localProviderABI, wallet);
  const localToken = new ethers.Contract(localTokenAddress, localTokenABI, wallet);
  const localMinter = new ethers.Contract(localMinterAddress, localMinterABI, wallet);
  
  if (true) {
    // set Palette
    console.log(`set Palette start`);
    await localNounsDescriptor.addManyColorsToPalette(0, palette);
    console.log(`set Palette end`);

    // set Accessories
    console.log(`set Accessories start`);
    const accessoryChunk = chunkArrayByPrefectureId(images.accessories);
    for (const chunk of accessoryChunk) {

      const prefectureId = chunk[0].prefectureId;
      await localNounsDescriptor.addManyAccessories(prefectureId, chunk.map(({ data }) => data), chunk.map(({ filename }) => filename));

      // console.log("chunk:", prefectureId, chunk);
    }
    console.log(`set Accessories end`);

    // set Heads
    console.log(`set Heads start`);
    const headChunk = chunkArrayByPrefectureId(images.heads);
    for (const chunk of headChunk) {

      const prefectureId = chunk[0].prefectureId;
      await localNounsDescriptor.addManyHeads(prefectureId, chunk.map(({ data }) => data), chunk.map(({ filename }) => filename));

      // console.log("chunk:", prefectureId, chunk);
    }
    console.log(`set Heads end`);

  }

//   for (var i: number = 1; i <= 47; i++) {
//     try {
//       await localMinter.functions['mintSelectedPrefecture(uint256)'](ethers.BigNumber.from(String(i)), { value: ethers.utils.parseEther('0.000001') });

//       console.log(`mint [`, i, `]`);
//     } catch (error) {
//       console.error(error);
//     };
//   }

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
prefectureId: string;

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

    let filename = imagedata[i].filename.split('-');
    let id = filename[0];
    imagedata[i].prefectureId = id;

    // filenameの抽出 ex)"35-yamaguchi-white -snake-accessories" -> "white-snake"
    let name = '';
    for (var j = 2; j < filename.length - 1; j++) {
      if (name.length > 0) {
        name += '-';
      }
      name += filename[j].trim();
    }
    imagedata[i].filename = name;
    console.log("imagedata[i].filename", imagedata[i].filename);

    if (!map.has(id)) {
      map.set(id, []);
    }
    map.get(id)!.push(imagedata[i]);
  }
  return Array.from(map.values());
}