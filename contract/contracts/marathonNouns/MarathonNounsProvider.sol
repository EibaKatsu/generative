// SPDX-License-Identifier: MIT

/*
 * Created by @eiba8884
 */

pragma solidity ^0.8.6;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IAssetProviderExMint.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/interfaces/IERC165.sol';
import 'randomizer.sol/Randomizer.sol';
import '../packages/graphics/SVG.sol';

import { INounsDescriptor } from './interfaces/INounsDescriptor.sol';
import { INounsSeeder } from './interfaces/INounsSeeder.sol';

contract MarathonNounsProvider is IAssetProviderExMint, IERC165, Ownable {
  using Strings for uint256;
  using Randomizer for Randomizer.Seed;
  using SVG for SVG.Element;

  string constant providerKey = 'MarathonNouns';

  INounsDescriptor public immutable descriptor;
  INounsDescriptor public immutable marathonDescriptor;

  mapping(uint256 => string) public eventName;

  constructor(INounsDescriptor _descriptor, INounsDescriptor _marathonDescriptor) {
    descriptor = _descriptor;
    marathonDescriptor = _marathonDescriptor;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IAssetProvider).interfaceId || interfaceId == type(IERC165).interfaceId;
  }

  function getOwner() external view override returns (address) {
    return owner();
  }

  function getProviderInfo() external view override returns (ProviderInfo memory) {
    return ProviderInfo(providerKey, 'Marathon Nouns', this);
  }

  function processPayout(uint256 _assetId) external payable override {
    address payable payableTo = payable(owner());
    payableTo.transfer(msg.value);
    emit Payout(providerKey, _assetId, payableTo, msg.value);
  }

  function totalSupply() external pure override returns (uint256) {
    return 0; // indicating "dynamically (but deterministically) generated from the given assetId)
  }

  function generateSeed(
    uint256 eventId,
    uint256 _assetId
  ) internal view returns (INounsSeeder.Seed memory mixedSeed) {
    uint256 pseudorandomness;
    Randomizer.Seed memory seed = Randomizer.Seed(_assetId, 0);

    // MarathonNounsのヘッドを決定
    uint256 headCount = marathonDescriptor.headCountInEvent(eventId);
    (seed, pseudorandomness) = seed.random(headCount);
    uint256 headPartId = marathonDescriptor.headInEvent(eventId, pseudorandomness);

    // Nounsのアクセサリを決定
    uint256 accessoryCount = descriptor.accessoryCount();
    (seed, pseudorandomness) = seed.random(accessoryCount);
    uint256 accesoryPartId = pseudorandomness;

    // Nounsのバックグラウンドを決定
    uint256 backgroundCount = descriptor.backgroundCount();
    (seed, pseudorandomness) = seed.random(backgroundCount);
    uint256 backgroundPartId = pseudorandomness;

    // Nounsのボディを決定
    uint256 bodyCount = descriptor.bodyCount();
    (seed, pseudorandomness) = seed.random(bodyCount);
    uint256 bodyPartId = pseudorandomness;

    // Nounsのグラスを決定
    uint256 glassesCount = descriptor.glassesCount();
    (seed, pseudorandomness) = seed.random(glassesCount);
    uint256 glassesPartId = pseudorandomness;

    mixedSeed = INounsSeeder.Seed({
      background: uint48(backgroundPartId),
      body: uint48(bodyPartId),
      accessory: uint48(accesoryPartId),
      head: uint48(headPartId),
      glasses: uint48(glassesPartId)
    });
  }

  function generateSVGPart(uint256 _assetId) public view override returns (string memory svgPart, string memory tag) {
    INounsSeeder.Seed memory seed = generateSeed(getEventId(_assetId), _assetId);

    svgPart = marathonDescriptor.generateSVGImage(seed);
    tag = string('');
  }

  // For debugging
  function generateSVGDocument(uint256 _assetId) external view returns (string memory svgDocument) {
    string memory svgPart;
    string memory tag;
    (svgPart, tag) = generateSVGPart(_assetId);
    svgDocument = string(SVG.document('0 0 1024 1024', bytes(svgPart), SVG.use(tag).svg()));
  }

  function generateTraits(uint256 _assetId) external view override returns (string memory traits) {
    INounsSeeder.Seed memory seed = generateSeed(getEventId(_assetId), _assetId);

    uint256 headPartsId = seed.head;
    traits = string(
      abi.encodePacked(
        // '{"trait_type": "prefecture" , "value":"',
        // eventName[tokenIdToEventId[_assetId] % 100],
        // '"}',
        '{"trait_type": "head" , "value":"',
        marathonDescriptor.headName(headPartsId),
        '"}'
      )
    );
  }

  function mint(uint256 _eventId, uint256 _assetId) external returns (uint256) {
    // TODO マラソン記録を格納する

  }

  function getEventId(uint256 _tokenId) public pure returns (uint256) {
    return _tokenId / 1_000_000_000;
  }
}
