// SPDX-License-Identifier: GPL-3.0

/// @title Interface for NounsSeeder

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░██░░░████░░██░░░████░░░ *
 * ░░██████░░░████████░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

interface ILocalNounsToken {
  function mintSelectedPrefecture(address to, uint256 prefectureId) external returns (uint256 tokenId);

  function mintSelectedPrefectureBatch(
    address _to,
    uint256[] memory _prefectureId,
    uint256[] memory _amount
  ) external returns (uint256 tokenId);

  function setMinter(address _minter) external;

  // Fires when the owner puts the trade
  event PutTradePrefecture(uint256 indexed tokenId, uint256[] _prefectures);

  // Fires when the owner cancel the trade
  event CancelTradePrefecture(uint256 indexed tokenId);
}
