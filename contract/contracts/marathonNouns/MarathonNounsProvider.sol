// SPDX-License-Identifier: MIT

/*
 * Created by @eiba8884
 */

pragma solidity ^0.8.6;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IAssetProviderExMint.sol';
import './interfaces/IEventStore.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/interfaces/IERC165.sol';
import 'randomizer.sol/Randomizer.sol';
import '../packages/graphics/SVG.sol';

import { INounsDescriptor } from './interfaces/INounsDescriptor.sol';
import { INounsSeeder } from './interfaces/INounsSeeder.sol';
import { Base64 } from 'base64-sol/base64.sol';

contract MarathonNounsProvider is IAssetProviderExMint, IERC165, Ownable {
  using Strings for uint256;
  using Randomizer for Randomizer.Seed;
  using SVG for SVG.Element;

  string constant providerKey = 'MarathonNouns';

  INounsDescriptor public immutable descriptor;
  INounsDescriptor public immutable marathonDescriptor;
  IEventStore public immutable eventStore;

  mapping(uint256 => string) public eventName;

  constructor(INounsDescriptor _descriptor, INounsDescriptor _marathonDescriptor, IEventStore _eventStore) {
    descriptor = _descriptor;
    marathonDescriptor = _marathonDescriptor;
    eventStore = _eventStore;
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
    tag = string('MarathonNouns');

    svgPart = svgForSeed(seed, tag);
  }

  function svgForSeed(INounsSeeder.Seed memory _seed, string memory _tag) public view returns (string memory svgPart) {
    string memory encodedSvg = marathonDescriptor.generateSVGImage(_seed);
    bytes memory svg = Base64.decode(encodedSvg);
    uint256 length = svg.length;
    uint256 start = 0;
    for (uint256 i = 0; i < length; i++) {
      if (uint8(svg[i]) == 0x2F && uint8(svg[i + 1]) == 0x3E) {
        // "/>": looking for the end of <rect ../>
        start = i + 2;
        break;
      }
    }
    length -= start + 6; // "</svg>"

    // substring
    /*
    bytes memory ret = new bytes(length);
    for(uint i = 0; i < length; i++) {
        ret[i] = svg[i+start];
    }
    */

    bytes memory ret;
    assembly {
      ret := mload(0x40)
      mstore(ret, length)
      let retMemory := add(ret, 0x20)
      let svgMemory := add(add(svg, 0x20), start)
      for {
        let i := 0
      } lt(i, length) {
        i := add(i, 0x20)
      } {
        let data := mload(add(svgMemory, i))
        mstore(add(retMemory, i), data)
      }
      mstore(0x40, add(add(ret, 0x20), length))
    }

    svgPart = string(
      abi.encodePacked('<g id="', _tag, '" transform="scale(3.2)" shape-rendering="crispEdges">\n', ret, '\n</g>\n')
    );
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
