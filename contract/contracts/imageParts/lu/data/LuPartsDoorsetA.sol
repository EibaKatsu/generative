pragma solidity ^0.8.6;

import "../../interfaces/IParts.sol";

contract LuPartsDoorsetA is IParts {

      function svgData(uint8 index) external pure override returns(uint16 sizes, bytes[] memory paths, string[] memory fill, uint8[] memory stroke) {
          sizes = 13;
          paths = new bytes[](13);
          fill = new string[](13);
          stroke = new uint8[](13);

          paths[0] = "\x4d\x60\x3b\x02\x09\x63\xb2\x54\x03\x57\x44\xfa\x05\x44\xfc\xf6\x54\x00\xf2\x44\xf4\xf2\x44\xed\xfb\x44\x8e\xf0\x44\x2c\xec\x34\xf7\xff\x44\xf0\xed\x44\x46\xea\x44\x25\x43\x50\x04\xa1\x46\xe6\xd0\x55\x40\x90\x05\x63\x74\x45\xad\x02\x46\xc9\x45\x56\x15\x2e\x55\x34\x27\x55\x98\x26\x55\xd5\xff\x54\x79\xf0\x54\xd9\xe5\x64\x56\xf8\x54\x62\xe9\x54\xbe\xe8\x64\x20\x43\x60\x76\x05\x69\x52\xfe\x68\x3b\x02\x09\x5a";
          paths[1] = "\x4d\x60\x11\x83\x05\x43\xfb\x55\x7d\xf0\x55\x7d\xda\x55\x7d\x61\x50\xd5\xd5\x55\x00\x00\x55\x00\xc4\x54\x09\x63\x40\xfc\x1d\x56\x02\x3d\x57\x01\x5a\x58\x25\x01\x55\x35\x01\x55\x5d\x01\x55\x0b\xe2\x54\x09\x9f\x54\x09\x6d\x04\x43\x05\x76\x60\x24\x66\x70\x11\x56\x83\x5a\x00";
          paths[2] = "\x4d\x60\x72\xb4\x05\x43\x60\x56\x9e\x40\x56\x8e\x1d\x56\x85\x63\x50\x13\xee\x45\xf8\xde\x46\xf8\xcc\x57\x00\x32\x45\xfc\x5d\x55\x04\x8f\x55\x2d\xff\x54\x45\xfe\x54\x48\xfa\x04\x73\x20\x35\x8f\x24\x35\x62\x63\x50\x05\xc0\x54\x0b\x6b\x54\x0b\x2c\x04\x43\x91\x66\x20\x8f\x56\xd7\x72\x56\xb4\x5a\x00";
          paths[3] = "\x4d\x50\x5a\xa5\x05\x68\xff\x04\x43\x06\x55\xd6\x14\x65\x7c\x1e\x65\xea\x63\x50\x02\x18\x55\x19\x1a\x56\x1e\x3c\x56\x09\x37\x55\x13\x73\x55\x15\xb8\x05\x6c\x40\x55\x01\x63\x50\x00\xe3\x43\xfb\xc7\x52\x00\xaa\x01\x43\x7a\x55\x90\x6f\x55\x96\x5a\x55\xa5\x5a\x00";
          paths[4] = "\x4d\x50\x3d\x0a\x07\x63\xfc\x44\xf2\x0d\x45\xe2\x19\x45\xe9\x73\x50\x02\x11\x55\x00\x1e\x05\x63\xfb\x54\x16\xfe\x54\x31\xfe\x54\x48\x00\x55\x0f\x20\x55\x29\xff\x54\x2b\xeb\x54\x02\xe8\x44\xd0\xe9\x44\xbe\x43\x50\x3d\x28\x57\x39\x1d\x57\x3d\x0a\x07\x5a";
          paths[5] = "\x4d\x80\xaa\x1c\x07\x61\x0e\x55\x0e\x00\x55\x00\x01\x45\xf9\xfe\x04\x63\xe3\x44\xfd\xc2\x44\xfc\xa5\x44\xfc\xd0\x44\xff\xba\x44\xfe\xb0\x44\xf8\x6c\x40\xf9\xfc\x04\x76\xf8\x04\x61\x84\x77\x84\x00\x55\x00\x00\x45\xfe\xb8\x04\x63\xfe\x44\xdf\xfc\x44\xbc\x00\x45\x9d\xff\x44\xfa\xff\x44\xf2\x05\x45\xeb\x61\x50\x13\x13\x55\x00\x00\x55\x01\x0f\x45\xfa\x6c\x50\x1a\x01\x05\x68\x0c\x05\x61\x54\x55\x54\x00\x55\x00\x01\x55\x1b\x04\x05\x68\x02\x05\x63\x0c\x55\x06\x2d\x55\x06\x46\x55\x06\x26\x55\x00\x36\x55\x01\x3d\x55\x0c\x6c\x50\x03\x05\x05\x73\xfa\x54\x2d\xf9\x54\x41\x61\x60\x32\x32\x56\x00\x00\x55\x01\xfa\x54\x3f\x76\x50\x02\x63\x50\x00\x02\x45\xff\x0c\x45\xff\x11\x55\x00\x12\x55\x00\x1e\x45\xfc\x25\x05\x41\x13\x55\x13\x00\x55\x00\x01\x85\xaa\x1c\x07\x5a";
          paths[6] = "\x4d\x80\x04\x4b\x06\x6c\x08\x55\x01\x68\x50\x07\x6c\x50\x17\xff\x04\x61\x3d\x55\x3d\x00\x55\x00\x01\x55\x16\x04\x05\x63\x1c\x55\x0e\x77\x55\x02\x7d\x55\x0d\xf6\x54\x2b\xfe\x54\x4f\xf5\x54\x7b\xfd\x54\x07\x00\x55\x2d\xfb\x54\x35\x73\x40\xfe\x03\x45\xfc\x03\x05\x6c\xfd\x44\xff\x63\x40\xbe\xf9\x44\x66\xfe\x44\x59\xf5\x54\x03\xcb\x44\xf6\x8a\x44\xfe\x55\x44\xff\xf6\x44\xff\xf3\x54\x05\xf3\x04";
          paths[7] = "\x4d\x80\x91\xf9\x06\x68\xfe\x04\x61\x90\x55\x90\x00\x55\x00\x00\x45\xd7\xfc\x04\x68\xee\x04\x61\x5a\x55\x5a\x00\x55\x00\x00\x45\xf2\x01\x05\x6c\xf1\x54\x01\x63\x40\xf1\x00\x45\xe9\xf9\x44\xe8\xeb\x04\x68\x00\x05\x76\xff\x04\x63\x02\x45\xf7\x00\x45\xe8\xfe\x44\xd7\xfc\x44\xe3\xf9\x44\xc5\x05\x45\xb8\x61\x50\x16\x16\x55\x00\x00\x55\x01\x11\x45\xf9\x6c\x50\x06\x01\x05\x63\x08\x55\x00\x12\x55\x01\x1c\x55\x02\x73\x50\x14\x02\x55\x1b\x02\x05\x68\x00\x05\x6c\x0d\x45\xff\x63\x50\x05\x00\x55\x0b\xff\x54\x11\xff\x04\x73\x14\x55\x01\x1b\x55\x09\x61\x50\x1b\x1b\x55\x00\x00\x55\x01\x05\x55\x15\x76\x50\x01\x6c\x40\xff\x01\x05\x63\xfa\x54\x09\xf9\x54\x1e\xf9\x54\x34\x43\x80\xa3\xdc\x86\xa2\xf9\x86\x91\xf9\x06\x5a";
          paths[8] = "\x4d\x80\x37\x76\x06\x63\x0f\x55\x00\x26\x55\x04\x31\x55\x04\x68\x50\x04\x6c\x50\x06\x01\x05\x63\x09\x55\x00\x14\x45\xfe\x1d\x45\xfe\x73\x50\x11\x02\x55\x10\x0d\x05\x63\xf4\x54\x20\xf7\x54\x40\xf4\x54\x61\x00\x55\x04\xfe\x54\x05\xfc\x54\x05\x73\x40\xf7\xfc\x44\xf1\xfc\x04\x68\xf8\x04\x63\xf5\x54\x00\xe8\x44\xff\xdb\x44\xff\x61\x50\x73\x73\x55\x00\x00\x55\x00\xe6\x54\x03\x6c\x40\xfb\x01\x05\x61\x09\x55\x09\x00\x55\x00\x01\x45\xf6\xf7\x04\x63\x01\x45\xde\xfa\x44\xbc\xfc\x44\x9a\x00\x45\xfc\x06\x45\xfb\x0f\x45\xfb";
          paths[9] = "\x4d\x80\x05\xdf\x05\x61\x12\x55\x12\x00\x55\x00\x01\x45\xfa\xff\x04\x63\xe3\x44\xfd\xc1\x44\xfc\xa5\x44\xfc\xd0\x44\xff\xba\x44\xfe\xb0\x44\xf8\x6c\x40\xf9\xfc\x04\x56\xc5\x05\x61\xee\x66\xee\x00\x55\x00\x00\x45\xfe\xb9\x04\x63\xfe\x44\xdf\xfc\x44\xbc\x00\x45\x9d\xff\x44\xfa\xfe\x44\xf2\x04\x45\xec\x41\x50\x15\x15\x55\x00\x00\x55\x01\x5f\x57\x00\x63\x50\x03\x00\x55\x16\x01\x55\x1a\x00\x05\x68\x0d\x05\x41\x4c\x55\x4c\x00\x55\x00\x01\x75\xa0\x04\x05\x68\x02\x05\x63\x0c\x55\x06\x2d\x55\x06\x46\x55\x06\x26\x55\x00\x36\x55\x00\x3d\x55\x0c\x6c\x50\x03\x05\x05\x73\xf9\x54\x2d\xf9\x54\x41\x61\x60\x19\x19\x56\x00\x00\x55\x01\xfb\x54\x3f\x76\x50\x01\x68\x50\x00\x63\x50\x00\x03\x45\xff\x0c\x45\xff\x12\x55\x00\x12\x45\xff\x1e\x45\xfc\x25\x05\x41\x13\x55\x13\x00\x55\x00\x01\x85\x05\xdf\x05\x5a";
          paths[10] = "\x4d\x70\x5f\x0e\x05\x6c\x09\x55\x01\x68\x50\x06\x6c\x50\x17\xff\x04\x61\x3d\x55\x3d\x00\x55\x00\x01\x55\x16\x03\x05\x63\x1c\x55\x0e\x77\x55\x02\x7d\x55\x0d\xf6\x54\x2b\xfe\x54\x4f\xf5\x54\x7b\xfd\x54\x07\x00\x55\x2d\xfc\x54\x35\xff\x54\x02\xfd\x54\x03\xfc\x54\x03\x61\x50\x05\x05\x55\x00\x00\x55\x01\xfd\x44\xff\x63\x40\xbe\xf9\x44\x66\xfe\x44\x59\xf5\x54\x03\xcb\x44\xf6\x8b\x44\xfe\x55\x44\xff\xf6\x44\xff\xf3\x54\x05\xf3\x04";
          paths[11] = "\x4d\x70\xec\xbc\x05\x68\xfe\x04\x63\xf3\x44\xfc\xe5\x44\xfc\xd7\x44\xfc\x68\x40\xee\x61\x50\x5b\x5b\x55\x00\x00\x55\x00\xf2\x54\x02\x6c\x40\xf1\x01\x05\x63\xf2\x54\x00\xea\x44\xf9\xe8\x44\xeb\x76\x40\xff\x68\x50\x00\x63\x50\x02\xf7\x54\x00\xe8\x44\xfe\xd7\x44\xfc\xe3\x44\xf9\xc5\x54\x05\xb7\x04\x61\x15\x55\x15\x00\x55\x00\x01\x55\x11\xf9\x04\x68\x06\x05\x63\x08\x55\x00\x12\x55\x01\x1c\x55\x02\x73\x50\x13\x02\x55\x1b\x02\x05\x68\x01\x05\x6c\x0c\x45\xff\x11\x45\xff\x63\x50\x08\x00\x55\x14\x01\x55\x1b\x09\x05\x61\x1d\x55\x1d\x00\x55\x00\x01\x55\x05\x15\x05\x76\x02\x05\x63\xfa\x54\x09\xf9\x54\x1e\xf9\x54\x33\x43\x70\xfe\x9f\x75\xfd\xbc\x75\xec\xbc\x05\x5a";
          paths[12] = "\x4d\x70\x92\x39\x05\x63\x0f\x55\x00\x26\x55\x04\x31\x55\x04\x68\x50\x0a\x63\x50\x08\x00\x55\x14\xfe\x54\x1d\xfe\x04\x73\x11\x55\x03\x11\x55\x0d\x63\x40\xf4\x20\x45\xf7\x40\x45\xf4\x61\x55\x00\x04\x45\xfe\x05\x45\xfc\x05\x05\x73\xf7\x44\xfc\xf1\x44\xfc\x68\x40\xf8\x63\x40\xf5\x00\x45\xe8\xff\x44\xdb\xff\x04\x61\x60\x55\x60\x00\x55\x00\x00\x45\xe6\x03\x05\x68\xfb\x04\x61\x09\x55\x09\x00\x55\x00\x01\x45\xf6\xf7\x04\x63\x01\x45\xde\xfa\x44\xbc\xfc\x44\x9a\x00\x45\xfc\x06\x45\xfb\x0f\x45\xfb";
          fill[0] = "#553852";
          fill[1] = "#e568a4";
          fill[2] = "#ff7ea4";
          fill[3] = "#ff7ea4";
          fill[4] = "#553852";
          fill[5] = "#504650";
          fill[6] = "#af5366";
          fill[7] = "#504650";
          fill[8] = "#ffc560";
          fill[9] = "#504650";
          fill[10] = "#af5366";
          fill[11] = "#504650";
          fill[12] = "#ffacda";
          stroke[0] = 0;
          stroke[1] = 0;
          stroke[2] = 0;
          stroke[3] = 0;
          stroke[4] = 0;
          stroke[5] = 0;
          stroke[6] = 0;
          stroke[7] = 0;
          stroke[8] = 0;
          stroke[9] = 0;
          stroke[10] = 0;
          stroke[11] = 0;
          stroke[12] = 0;
      }
}