import { ethers, network } from 'hardhat';
import { exec } from 'child_process';

// const nounsDescriptor: string = network.name == 'goerli' ? addresses[5].nounsDescriptor : addresses[1].nounsDescriptor;
// const nounsSeeder: string = network.name == 'goerli' ? addresses[5].nounsSeeder : addresses[1].nounsSeeder;
// const nftDescriptor: string = network.name == 'goerli' ? addresses[5].nftDescriptor : addresses[1].nftDescriptor;
const nounsDescriptor: string = '0xFE8C02d95A5058F54Ebc4242A43D3E9A6290102d'; // mumbai
const nounsSeeder: string = '0x5f5C984E0BAf150D5a74ae21f4777Fd1947DE8c9'; // mumbai
const nftDescriptor: string = '0x1881c541E9d83880008B3720de0E537C34052ecf'; // mumbai

const committee = "0x52A76a606AC925f7113B4CC8605Fe6bCad431EbB";

async function main() {

  const factorySeeder = await ethers.getContractFactory('LocalNounsSeeder');
  const localseeder = await factorySeeder.deploy();
  await localseeder.deployed();
  console.log(`##localseeder="${localseeder.address}"`);
  await runCommand(`npx hardhat verify ${localseeder.address} --network ${network.name}`);

  const factoryLocalNounsDescriptor = await ethers.getContractFactory('LocalNounsDescriptor', {
    libraries: {
      NFTDescriptor: nftDescriptor,
    }
  });
  const localNounsDescriptor = await factoryLocalNounsDescriptor.deploy(
    nounsDescriptor
  );
  await localNounsDescriptor.deployed();
  console.log(`##localNounsDescriptor="${localNounsDescriptor.address}"`);
  await runCommand(`npx hardhat verify ${localNounsDescriptor.address} ${nounsDescriptor} --network ${network.name}`);

  const factorySVGStore = await ethers.getContractFactory('LocalNounsProvider');
  const provider = await factorySVGStore.deploy(nounsDescriptor, localNounsDescriptor.address, nounsSeeder, localseeder.address);
  await provider.deployed();
  console.log(`##LocalNounsProvider="${provider.address}"`);
  await runCommand(`npx hardhat verify ${provider.address} ${nounsDescriptor} ${localNounsDescriptor.address} ${nounsSeeder} ${localseeder.address} --network ${network.name}`);

  const factoryToken = await ethers.getContractFactory('LocalNounsToken');
  const token = await factoryToken.deploy(provider.address, committee, committee, committee);
  await token.deployed();
  console.log(`##LocalNounsToken="${token.address}"`);
  await runCommand(`npx hardhat verify ${token.address} ${provider.address} ${committee} ${committee} ${committee} --network ${network.name}`);

}

async function runCommand(command: string) {
  console.log(command);
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