import { ethers, network } from 'hardhat';
import { exec } from 'child_process';
import { writeFile } from 'fs';
import { addresses } from '../../src/utils/addresses';

const nounsDescriptor = addresses.nounsDescriptor[network.name];
const nftDescriptor = addresses.nftDescriptor[network.name];
const fontProvider = addresses.londrina_solid[network.name];

async function main() {

  const [minter] = await ethers.getSigners();
  console.log(`##minter="${minter.address}"`);

  const factoryMarathonNounsDescriptor = await ethers.getContractFactory('MarathonNounsDescriptor', {
    libraries: {
      NFTDescriptor: nftDescriptor,
    }
  });
  const MarathonNounsDescriptor = await factoryMarathonNounsDescriptor.deploy(
    nounsDescriptor
  );
  await MarathonNounsDescriptor.deployed();
  console.log(`##MarathonNounsDescriptor="${MarathonNounsDescriptor.address}"`);
  await runCommand(`npx hardhat verify ${MarathonNounsDescriptor.address} ${nounsDescriptor} --network ${network.name} &`);

  const addresses2 = `export const addresses = {\n` + `  MarathonNounsDescriptor:"${MarathonNounsDescriptor.address}",\n` + `}\n`;
  await writeFile(`../src/utils/addresses/MarathonNounsDescriptor_${network.name}.ts`, addresses2, () => { });


  const factoryEventStore = await ethers.getContractFactory('EventStore');
  const eventStore = await factoryEventStore.deploy();
  await eventStore.deployed();
  console.log(`##EventStore="${eventStore.address}"`);
  await runCommand(`npx hardhat verify ${eventStore.address} --network ${network.name} &`);

  const addresses3 = `export const addresses = {\n` + `  EventStore:"${eventStore.address}",\n` + `}\n`;
  await writeFile(`../src/utils/addresses/EventStore_${network.name}.ts`, addresses3, () => { });

  const factoryProvider = await ethers.getContractFactory('MarathonNounsProvider');
  const provider = await factoryProvider.deploy(nounsDescriptor, MarathonNounsDescriptor.address, fontProvider, eventStore.address);
  await provider.deployed();
  console.log(`##MarathonNounsProvider="${provider.address}"`);
  await runCommand(`npx hardhat verify ${provider.address} ${nounsDescriptor} ${MarathonNounsDescriptor.address} ${fontProvider} ${eventStore.address} --network ${network.name} &`);

  const addresses4 = `export const addresses = {\n` + `  MarathonNounsProvider:"${provider.address}",\n` + `}\n`;
  await writeFile(`../src/utils/addresses/MarathonNounsProvider_${network.name}.ts`, addresses4, () => { });

  const factoryToken = await ethers.getContractFactory('MarathonNounsToken');
  const token = await factoryToken.deploy(provider.address, minter.address);
  await token.deployed();
  console.log(`##MarathonNounsToken="${token.address}"`);
  await runCommand(`npx hardhat verify ${token.address} ${provider.address} ${minter.address} --network ${network.name} &`);

  const addresses5 = `export const addresses = {\n` + `  MarathonNounsToken:"${token.address}",\n` + `}\n`;
  await writeFile(`../src/utils/addresses/MarathonNounsToken_${network.name}.ts`, addresses5, () => { });

}

async function runCommand(command: string) {
  if (network.name !== 'localhost') {
    console.log(command);
  }
  // なぜかコマンドが終了しないので手動で実行
  // await exec(command, (error, stdout, stderr) => {
  //     if (error) {
  //         console.log(`error: ${error.message}`);
  //         return;
  //     }
  //     if (stderr) {
  //         console.log(`stderr: ${stderr}`);
  //         return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  // });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});