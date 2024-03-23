// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface ITimeRecordStore {
  struct TimeRecord {
    uint256 tokenId;
    string distance;
    string grossTime;
    string netTime;
    uint256 ranking;
  }

  function register(TimeRecord memory _record) external returns (uint256);

  function getTimeRecord(uint256 _tokenId) external view returns (TimeRecord memory output);

  function getNetTime(uint256 _tokenId) external view returns (string memory output);

  function getGrossTime(uint256 _tokenId) external view returns (string memory output);

  function getDistance(uint256 _tokenId) external view returns (string memory output);
}
