// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

interface IPointCalculator {
  struct PointToken {
    ERC20 token;
    uint256 snapshot;
    uint8 coefficient; // 1000 for 100%, 10 for 1%
  }

  function calculate(address _address) external view returns (uint256);

  function addPointToken(ERC20 _token, uint256 _snapshot, uint8 _confficient) external;

  function removePointToken(ERC20 _token) external;

  function generateTraits(address _address) external view returns (string memory traits);
}
