// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/Strings.sol';
import './interfaces/ITimeRecordStore.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract TimeRecordStore is ITimeRecordStore, Ownable {
  using Strings for uint8;

  mapping(uint256 => TimeRecord) private tokenIdToTimeRecord;
  address public provider ;

  ////////// modifiers //////////
  modifier onlyProviderOrOwner() {
    require(owner() == _msgSender() || provider == _msgSender(), "Not owner or provider");
    _;
  }

  function register(TimeRecord memory _record) external onlyProviderOrOwner returns (uint256) {
    tokenIdToTimeRecord[_record.tokenId] = _record;
    return _record.tokenId;
  }

  function setProvider(address _provider) external onlyOwner {
    provider = _provider;
  }
  
  function getTimeRecord(uint256 _tokenId) external view returns (TimeRecord memory output) {
    output = tokenIdToTimeRecord[_tokenId];
  }

  function getNetTime(uint256 _tokenId) external view returns (string memory output) {
    output = string(abi.encodePacked('[NET] ', tokenIdToTimeRecord[_tokenId].netTime));
  }

  function getGrossTime(uint256 _tokenId) external view returns (string memory output) {
    output = string(abi.encodePacked('[GRS] ', tokenIdToTimeRecord[_tokenId].grossTime));
  }

  function getDistance(uint256 _tokenId) external view returns (string memory output) {
    output = tokenIdToTimeRecord[_tokenId].distance;
  }

}
