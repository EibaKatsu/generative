// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { Base64 } from 'base64-sol/base64.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import 'assetprovider.sol/IAssetProvider.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * ProviderSBT is an abstract implentation of ERC721, which is built on top of an asset provider.
 * The specified asset provider is responsible in providing images for NFTs in SVG format,
 * which turns them into fully on-chain NFTs.
 */
abstract contract ProviderSBT is ERC721, AccessControlEnumerable, Ownable {
  using Strings for uint256;
  using Strings for uint16;

  bytes32 public constant CONTRACT_ADMIN = keccak256('CONTRACT_ADMIN');

  uint256 public nextTokenId;

  // To be specified by the concrete contract
  string public description;
  uint256 public mintPrice;
  uint256 public mintLimit;

  IAssetProvider public assetProvider;

  constructor(
    IAssetProvider _assetProvider,
    string memory _title,
    string memory _shortTitle,
    address[] memory _administrators
  ) ERC721(_title, _shortTitle) {
    _setRoleAdmin(CONTRACT_ADMIN, CONTRACT_ADMIN);
    for (uint256 i = 0; i < _administrators.length; i++) {
      _setupRole(CONTRACT_ADMIN, _administrators[i]);
    }
    assetProvider = _assetProvider;
  }

  ////////// modifiers //////////
  modifier onlyAdminOrOwner() {
    require(hasAdminOrOwner(), 'caller is not the admin');
    _;
  }

  ////////// internal functions start //////////
  function hasAdminOrOwner() internal view returns (bool) {
    return owner() == _msgSender() || hasRole(CONTRACT_ADMIN, _msgSender());
  }

  ////////// onlyOwner functions start //////////
  function setAdminRole(address[] memory _administrators) external onlyAdminOrOwner {
    for (uint256 i = 0; i < _administrators.length; i++) {
      _grantRole(CONTRACT_ADMIN, _administrators[i]);
    }
  }

  function revokeAdminRole(address[] memory _administrators) external onlyAdminOrOwner {
    for (uint256 i = 0; i < _administrators.length; i++) {
      _revokeRole(CONTRACT_ADMIN, _administrators[i]);
    }
  }

  function setAssetProvider(IAssetProvider _assetProvider) external onlyAdminOrOwner {
    assetProvider = _assetProvider; // upgradable
  }

  function setDescription(string memory _description) external onlyAdminOrOwner {
    description = _description;
  }

  function setMintPrice(uint256 _price) external onlyAdminOrOwner {
    mintPrice = _price;
  }

  function setMintLimit(uint256 _limit) external onlyAdminOrOwner {
    mintLimit = _limit;
  }

  string constant SVGHeader = '<svg viewBox="0 0 1024 1024' '"  xmlns="http://www.w3.org/2000/svg">\n' '<defs>\n';

  /*
   * A function of IAssetStoreToken interface.
   * It generates SVG with the specified style, using the given "SVG Part".
   */
  function generateSVG(uint256 _assetId) internal view returns (string memory) {
    // Constants of non-value type not yet implemented by Solidity
    (string memory svgPart, string memory tag) = assetProvider.generateSVGPart(_assetId);
    return string(abi.encodePacked(SVGHeader, svgPart, '</defs>\n' '<use href="#', tag, '" />\n' '</svg>\n'));
  }

  /**
   * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function tokenURI(uint256 _tokenId) public view override virtual returns (string memory) {
    require(_exists(_tokenId), 'ProviderToken.tokenURI: nonexistent token');
    bytes memory image = bytes(generateSVG(_tokenId));

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
                Base64.encode(image),
                '"}'
              )
            )
          )
        )
      );
  }

  function tokenName(uint256 _tokenId) internal view virtual returns (string memory) {
    return _tokenId.toString();
  }

  /**
   * For non-free minting,
   * 1. Override this method
   * 2. Check for the required payment, by calling mintPriceFor()
   * 3. Call the processPayout method of the asset provider with appropriate value
   */
  function mint() public payable virtual returns (uint256 tokenId) {
    require(nextTokenId < mintLimit, 'Sold out');
    _safeMint(msg.sender, tokenId);

    return nextTokenId++;
  }

  function totalSupply() public view returns (uint256) {
    return nextTokenId;
  }

  function generateTraits(uint256 _tokenId) internal view returns (bytes memory traits) {
    traits = bytes(assetProvider.generateTraits(_tokenId));
  }

  function debugTokenURI(uint256 _tokenId) public view returns (string memory uri, uint256 gas) {
    gas = gasleft();
    uri = tokenURI(_tokenId);
    gas -= gasleft();
  }

  // ==================================================================
  // For SBT
  // ==================================================================
  function setApprovalForAll(
    address, /*operator*/
    bool /*approved*/
  ) public virtual override {
    revert('This token is SBT.');
  }

  function approve(
    address, /*to*/
    uint256 /*tokenId*/
  ) public virtual override {
    revert('This token is SBT.');
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256, /*tokenId*/
    uint256 /*batchSize*/
  ) internal virtual override {
    require(from == address(0) || to == address(0), 'This token is SBT, so this can not transfer.');
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(AccessControlEnumerable, ERC721)
    returns (bool)
  {
    return
      interfaceId == type(IAccessControlEnumerable).interfaceId ||
      interfaceId == type(IAccessControl).interfaceId ||
      ERC721.supportsInterface(interfaceId);
  }
}
