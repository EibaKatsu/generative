// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './interfaces/IPointCalculator.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import './interfaces/IPointCalculator.sol';

contract PointCalculator is IPointCalculator, AccessControl {
  using Strings for uint256;

  PointToken[] public tokens;
  mapping(address => uint256) public levels;

  /*
   * Add ERC20 Token which is counted as points
   * @param _token ERC20 Token address
   * @param _snapshot the blocknumber which is started cuont
   * @param _confficient parcentage of culculate levels (1000 for 100%)
   */
  function addPointToken(ERC20 _token, uint256 _snapshot, uint8 _confficient) external override {
    require(address(_token) != address(0), 'PointCalculator:addPointToken token is zero');

    for (uint256 i = 0; i < tokens.length; i++) {
      require(address(_token) != address(tokens[i].token), 'PointCalculator:addPointToken token is already entried');
    }

    tokens.push(PointToken(_token, _snapshot, _confficient));
  }

  /*
   * Remove ERC20 Token which is counted as points.
   * @param _token ERC20 Token address
   */
  function removePointToken(ERC20 _token) external {
    for (uint256 i = 0; i < tokens.length; i++) {
      if (address(_token) == address(tokens[i].token)) {
        tokens[i] = tokens[tokens.length];
        tokens.pop();
      }
    }
  }

  /*
   *  Calculate levels.
   *  @param _address the address to calculate.
   */
  function calculate(address _address) external override view returns (uint256 level) {
    for (uint256 i; i < tokens.length; i++) {
      uint256 balance = tokens[i].token.balanceOf(_address);
      level += balance;
    }
  }

  /*
   * generate Traits for tokenURI.
   */
  function generateTraits(address _address) external view override returns (string memory traits) {
    uint256 count;
    for (uint256 i; i < tokens.length; i++) {
      uint256 balance = tokens[i].token.balanceOf(_address);
      if (balance > 0) {
        if (count == 0) {
          traits = string(abi.encodePacked(
            traits,
            '{"trait_type":"',
            tokens[i].token.name(),
            '","value":',
            balance.toString(),
            '}'
          ));
        } else {
          traits = string(abi.encodePacked(
            traits,
            ',{"trait_type":"',
            tokens[i].token.name(),
            '","value":',
            balance.toString(),
            '}'
          ));
        }
        count++;
      }
    }
  }
}
