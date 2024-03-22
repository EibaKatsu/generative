import * as dotenv from "dotenv";
import { ethers, network } from 'hardhat';

import { abi as nounsDescriptorABI } from "../artifacts/contracts/marathonNouns/MarathonNounsDescriptor.sol/MarathonNounsDescriptor";
import { abi as EventStoreABI } from "../artifacts/contracts/marathonNouns/EventStore.sol/EventStore";
import { addresses } from '../../src/utils/addresses';
import { palette } from "../test/image-local-data";

dotenv.config();

const nounsDescriptorAddress = addresses.MarathonNounsDescriptor[network.name];
const eventStoreAddress = addresses.EventStore[network.name];

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
  const eventStore = new ethers.Contract(eventStoreAddress, EventStoreABI, wallet);

  const feeData = await ethers.provider.getFeeData();
  console.log("feeData:" + feeData.gasPrice);

  let tx;
  if (true) {
    // set Palette 初回のみ
    console.log(`set Palette start`);
    await nounsDescriptor.addManyColorsToPalette(0, palette);
    console.log(`set Palette end`);
  }

    // イベントデータ
    // https://docs.google.com/spreadsheets/d/130fv7__zNwH8MnaP2BBTqzcQzDwGIkLAV4NdUWtTvTw/edit?usp=sharing
    const eventList = [
      [1,'kurobe Meisui',41,'2024.5.26','2024','','#AFEEEE','Raicho','0x00031d15021200047f05001100077f03001100047f020e017f010e02000600010f0a00077f020e0100050001dd010f01dd0800077f0400050001dd017e01dd010f0400097f0500017f0500017e01dd010f02000c7f04000100010e017f0200010f01dd017e107f03000100017f020e157f02000200177f02000200177f02000300167f02000300157f01dd010001dd010001dd0200137f010001dd010f01dd010001dd010f0200117f0100010f01dd017e010001dd017e010f01dd0300067f030e057f010001dd010f017e02dd0200017e01dd010f03000a7f040001dd017e0300010002dd017e010f0300027f0400027f0500010f017e02dd02000300010f037e0100027f010e0300027f010e0300027e010f0400'],
      [2,'Hakodate Marathon',0,'2024.6.30','2024','','#FFCCD8','goryokaku','0x00021b16040b0002540a000a00045409000900025401c001dd025408000800025401c001dd01c001dd025407000700035401dd02c001dd0254018706000500035402c001dd03c001dd0187035404000300035401c0015401c002dd03c0018702dd045402000100035401c002dd01c001dd04c0018703c002dd04540100025401c001dd02c001dd01c0019202c0018706c002dd02540200025401c001dd02c0019202c0018707c001dd025401000300025401c001dd02c00287029204c002dd01c00254010003000187015402c001dd03c0029203c001dd02c0025402000200015402870154018701dd08c001dd01c0025403000100015401dd01c0028701c001dd07c001dd01c002540400015401c001dd01c00187025401c001dd06c001dd01c0025404000100025401c0025401c001dd02c004dd02c001dd01c0015404000300035401c001dd01c001dd04c001dd01c001dd01c0025403000400025401c002dd01c0045401c002dd01c0025403000400025401dd02c0065402c001dd025403000500055404000554040005000354080003540400'],
      [3,'Tokyo Marathon',0,'2024.3.3','2024','','#FFF0F5','Station','0x00011c14050b0001360b0017000b0001360b000b0001360b000700030d0336030d07000600010d010b010d0136010d010b010d0136010d010b010d06000600030d0136030d0136030d06000100013604000bbf040001360100060001bf020b01bf030b01bf020b01bf0600010001360300040d0136030d0136040d03000136010003360100010d010b020d0136010d01bf010b01bf010d0136020d010b010d0100033603bf030d01350136020d03bf020d01360135030d03bf010b02bf010b01bf010b010101bf010b01bf030b01bf010b01bf0101010b01bf010b02bf010b010b02bf010b01bf010b010101bf010b01bf030b01bf010b01bf0101010b01bf010b02bf010b06bf010109bf010106bf010b02bf010b01bf010b02bf010b01bf030b01bf010b02bf010b01bf010b02bf010b010b02bf010b01bf010b02bf010b01bf030b01bf010b02bf010b01bf010b02bf010b170d010b02bf0272010b04bf037201bf010b02bf010b027202bf010b010b02bf0272010b04bf037201bf010b02bf010b027202bf010b'],
    ];

    for(const eventData of eventList){
      // MarathonNounsDescriptorの登録
      tx = await nounsDescriptor.addHead(eventData[0],eventData[8],eventData[7], { gasPrice: feeData.gasPrice });
      console.log("set head:",eventData[0], eventData[7], tx.hash);

      // EventStoreの登録
      const event = {
        eventId: eventData[0],
        name: eventData[1],
        times: eventData[2],
        date: eventData[3],
        year: eventData[4],
        organizer: eventData[5],
        background: eventData[6],
      }
      tx = await eventStore.register(event, { gasPrice: feeData.gasPrice });
      console.log("set event:",eventData[0], eventData[1], tx.hash);

    }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

