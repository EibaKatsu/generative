import { expect } from 'chai';
import { ethers, SignerWithAddress, Contract } from 'hardhat';

let owner: SignerWithAddress,
  user1: SignerWithAddress,
  user2: SignerWithAddress,
  user3: SignerWithAddress;

let pnPoint: Contract, pointCalculator: Contract;

before(async () => {
  [owner, user1, user2, user3] = await ethers.getSigners();

  const pnPointFactory = await ethers.getContractFactory('PnPoint');
  pnPoint = await pnPointFactory.deploy();
  await pnPoint.deployed();

  const pointCalculatorFactory = await ethers.getContractFactory('PointCalculator');
  pointCalculator = await pointCalculatorFactory.deploy();
  await pointCalculator.deployed();

});

describe('PointCalculator', function () {
  let result, tx, err, balance;
  const price = ethers.BigNumber.from('1000000000000000');
  console.log(ethers.utils.formatEther(price));

  it('PnPoint mint', async function () {

    const balance1 = await pnPoint.balanceOf(user1.address);
    console.log("balance1", balance1);

    await pnPoint.mint(user1.address, 100);

    const balance2 = await pnPoint.balanceOf(user1.address);
    console.log("balance2", balance2);

    expect(balance2 - balance1).equal(100);

  });
});
