// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import 'assetprovider.sol/IAssetProvider.sol';

interface IAssetProviderExMint is IAssetProvider {

  /**
   * This function returns SVGPart and the tag. The SVGPart consists of one or more SVG elements.
   * The tag specifies the identifier of the SVG element to be displayed (using <use> tag).
   * The tag is the combination of the provider key and assetId (e.e., "asset123")
   */
  function generateSVGPart(uint256 _assetId) external view returns(string memory svgPart, string memory tag);

  /**
   * This is an optional function, which returns various traits of the image for ERC721 token.
   * Format: {"trait_type":"TRAIL_TYPE","value":"VALUE"},{...}
   */
  function generateTraits(uint256 _assetId) external view returns (string memory);

  function mint(uint256 eventId, uint256 _assetId) external returns (uint256);

}
