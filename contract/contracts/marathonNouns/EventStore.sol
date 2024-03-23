// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/Strings.sol';
import './interfaces/IEventStore.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract EventStore is IEventStore, AccessControl {
  using Strings for uint8;

  mapping(uint256 => Event) private eventIdToEvent;
  address public provider;

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function register(Event memory _event) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
    eventIdToEvent[_event.eventId] = _event;
    return _event.eventId;
  }

  function setProvider(address _provider) external onlyRole(DEFAULT_ADMIN_ROLE) {
    provider = _provider;
  }

  function getEvent(uint256 _eventId) external view returns (Event memory output) {
    output = eventIdToEvent[_eventId];
  }

  function getBackground(uint256 _eventId) external view returns (string memory output) {
    output = eventIdToEvent[_eventId].background;
  }

  function getTitle(uint256 _eventId) external view returns (string memory output) {
    string memory times;
    string memory unit;
    if (eventIdToEvent[_eventId].times > 0) {
      if (
        eventIdToEvent[_eventId].times % 100 == 11 ||
        eventIdToEvent[_eventId].times % 100 == 12 ||
        eventIdToEvent[_eventId].times % 100 == 13
      ) {
        unit = 'th';
      } else if (eventIdToEvent[_eventId].times % 10 == 1) {
        unit = 'st';
      } else if (eventIdToEvent[_eventId].times % 10 == 2) {
        unit = 'nd';
      } else if (eventIdToEvent[_eventId].times % 10 == 3) {
        unit = 'rd';
      } else {
        unit = 'th';
      }
      times = string(abi.encodePacked(eventIdToEvent[_eventId].times.toString(), unit, ' '));
    }

    output = string(abi.encodePacked(times, eventIdToEvent[_eventId].name, ', ', eventIdToEvent[_eventId].year));
  }
}
