// SPDX-License-Identifier: MIT

/*
 * Created by @eiba8884
 */

pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import { INounsSeeder } from './interfaces/INounsSeeder.sol';
import './interfaces/IAssetProviderExMint.sol';
import './interfaces/IMarathonNounsToken.sol';

contract MarathonNounsToken is ProviderTokenA2, IMarathonNounsToken {
  using Strings for uint256;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  string public description;
  IAssetProviderExMint public assetProvider;
  mapping(address => bool) public mintableAddress;
  mapping(uint256 => uint256) public tokenIdPerEvent;

  constructor(
    IAssetProviderExMint _assetProvider,
    address _minter
  ) ERC721('Marathon Nouns', 'Marathon Nouns') {
    description = 'Marathon NFT';
    assetProvider = _assetProvider;

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, _minter);
    _grantRole(MINTER_ROLE, msg.sender);
  }

  function tokenName(uint256 _tokenId) internal pure override returns (string memory) {
    return string(abi.encodePacked('Marathon NFT ', _tokenId.toString()));
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_tokenId < _nextTokenId(), 'nonexistent token');

    (string memory svgPart, string memory tag) = assetProvider.generateSVGPart(_tokenId);
    bytes memory image = bytes(svgPart);

    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name":"',
                tokenName(_tokenId),
                '","description":"',
                description,
                '","attributes":[',
                generateTraits(_tokenId),
                '],"image":"data:image/svg+xml;base64,',
                image,
                '"}'
              )
            )
          )
        )
      );
  }

  /**
   イベント番号を指定してミントします。
   */
  function mintMarathonNFT(
    address _to,
    uint256 _eventId
  ) public virtual onlyRole(MINTER_ROLE) returns (uint256 tokenId) {

    // tokenIdの採番
    tokenIdPerEvent[_eventId]++;
    tokenId = _eventId * 1_000_000 + tokenIdPerEvent[_eventId];

    // ミント
    _safeMint(_to, tokenId);
    assetProvider.mint(_eventId, tokenId);
  }

  function mint() public payable override returns (uint256) {
    revert('Cannot use');
  }

  function setMinter(address _minter, bool _val) external onlyRole(DEFAULT_ADMIN_ROLE) {
    mintableAddress[_minter] = _val;
  }

  function withdraw() external payable onlyRole(DEFAULT_ADMIN_ROLE) {
    _sendRoyalty(address(this).balance);
  }

  function generateTraits(uint256 _tokenId) internal view returns (bytes memory traits) {
    traits = bytes(assetProvider.generateTraits(_tokenId));
  }

  function debugTokenURI(uint256 _tokenId) public view returns (string memory uri, uint256 gas) {
    gas = gasleft();
    uri = tokenURI(_tokenId);
    gas -= gasleft();
  }
}
