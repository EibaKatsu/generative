// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

interface IEventStore {
  struct Event {
    uint256 eventId;
    uint8 times;
    string name;
    string date;
    string year;
    string organizer;
    string background;
  }

  function register(Event memory _event) external returns (uint256);

  function getEvent(uint256 _eventId) external view returns (Event memory output);

  function getTitle(uint256 _eventId) external view returns (string memory output);

  function getBackground(uint256 _eventId) external view returns (string memory output);

}
