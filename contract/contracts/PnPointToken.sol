// SPDX-License-Identifier: MIT

/*
 * Created by Isamu Arimoto (@isamua)
 */

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/Strings.sol';
import './libs/ProviderSBT.sol';
import './pnPoint/interfaces/IPointCalculator.sol';
import { INounsSeeder } from './localNouns/interfaces/INounsSeeder.sol';
import './localNouns/interfaces/IAssetProviderExMint.sol';

contract PnPointToken is ProviderSBT {
  using Strings for uint256;

  IPointCalculator public calculator;

  constructor(
    IAssetProviderExMint _assetProvider,
    address[] memory _administrators
  ) ProviderSBT(_assetProvider, 'pNouns Point Token', 'PNPoint', _administrators) {
    description = 'pNouns Point Token.';
    assetProvider = _assetProvider;
  }

  function tokenName(uint256 _tokenId) internal view override returns (string memory) {
    return string(abi.encodePacked('#', _tokenId.toString(), ' Lv.', calculator.calculate(ownerOf(_tokenId))));
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_tokenId < totalSupply(), 'LocalNounsToken.tokenURI: nonexistent token');

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
                calculator.generateTraits(ownerOf(_tokenId)),
                '],"image":"data:image/svg+xml;base64,',
                image,
                '"}'
              )
            )
          )
        )
      );
  }

  function mint() public payable virtual override returns (uint256 tokenId) {
    // assetProvider.mint(totalSupply());
    super.mint();
    return totalSupply() - 1;
  }
}
