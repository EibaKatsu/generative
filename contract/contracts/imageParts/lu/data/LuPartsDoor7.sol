pragma solidity ^0.8.6;

import '../../interfaces/IParts.sol';

contract LuPartsDoor7 is IParts {
  function svgData(
    uint8 index
  ) external pure override returns (uint16 sizes, bytes[] memory paths, string[] memory fill, uint8[] memory stroke) {
    sizes = 5;
    paths = new bytes[](5);
    fill = new string[](5);
    stroke = new uint8[](5);

    paths[
      0
    ] = '\x4d\x50\x21\x00\x09\x63\xc7\x44\xf9\xf9\x34\xe8\xeb\x34\x89\x43\x50\x01\xda\x56\x08\x28\x56\x01\x70\x45\xee\xf5\x54\xa0\x1f\x55\xe8\x17\x65\x25\x10\x65\xbe\xd0\x64\xa5\x4b\x65\x72\x7e\x66\x8a\x36\x68\x6d\xed\x68\x68\x12\x59\x85\xe4\x58\x21\x00\x09\x5a';
    paths[
      1
    ] = '\x4d\x50\x86\x33\x05\x43\x81\x55\x35\x07\x55\x24\x17\x55\x6d\x63\x50\x03\x35\x45\xfc\x16\x56\x02\x59\x56\x0c\x26\x55\x01\x8b\x55\x09\xc6\x45\xf9\x62\x55\x02\xc4\x45\xf2\x28\x56\x05\x48\x55\x2d\x3c\x55\x63\x30\x55\x01\x67\x54\x03\xcc\x53\x0a\x35\x03\x43\x89\x65\x78\x86\x55\xd4\x86\x55\x33\x5a\x00';
    paths[
      2
    ] = '\x4d\x60\x0f\x26\x05\x41\x6b\x55\x6b\x00\x55\x00\x01\x55\xd5\x2c\x05\x63\xdf\x44\xf9\xd8\x44\xf6\xbd\x54\x02\x01\x55\xa1\x05\x65\x47\xfb\x64\xe7\xf9\x54\x98\xfb\x64\x31\xfa\x64\xca\x11\x45\xfc\x76\x45\xfc\x7b\x45\xfc\x43\x60\x0e\x9f\x67\x17\x62\x66\x0f\x26\x05\x5a';
    paths[
      3
    ] = '\x4d\x60\x19\x23\x05\x63\x08\x65\x3c\x09\x75\x7a\xfc\x84\xb6\x1a\x55\x01\x37\x55\x10\x47\x55\x04\x1d\x45\xe6\x06\x45\x21\x1c\x35\xe1\x02\x45\x2c\x04\x35\x3b\x1e\x25\x68\x43\x60\x6f\x01\x65\x2e\x1a\x65\x19\x23\x05\x5a';
    paths[
      4
    ] = '\x4d\x50\x5e\xe4\x06\x6d\xe0\x54\x00\x61\x50\x20\x20\x55\x00\x01\x55\x01\x41\x55\x00\x61\x50\x20\x20\x55\x00\x01\x55\x01\xbf\x54\x00';
    fill[0] = '#504650';
    fill[1] = '#f7931e';
    fill[2] = '#f77074';
    fill[3] = '#f7931e';
    fill[4] = '#ffde80';
    stroke[0] = 0;
    stroke[1] = 0;
    stroke[2] = 0;
    stroke[3] = 0;
    stroke[4] = 0;
  }
}
