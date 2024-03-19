pragma solidity ^0.8.6;

import './interfaces/IEventStore.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract EventStore is IEventStore, Ownable {
  mapping(uint256 => Event) private eventIdToEvent;
  address public provider ;

  ////////// modifiers //////////
  modifier onlyProviderOrOwner() {
    require(owner() == _msgSender() || provider == _msgSender(), "Not owner or provider");
    _;
  }

  function register(Event memory _event) external onlyProviderOrOwner returns (uint256) {
    eventIdToEvent[_event.eventId] = _event;
    return _event.eventId;
  }

  function setProvider(address _provider) external onlyOwner {
    provider = _provider;
  }
  
  function getEvent(uint256 _eventId) external view returns (Event memory output) {
    output = eventIdToEvent[_eventId];
  }

  function getTitle(uint256 _eventId) external view returns (string memory output) {
    output = string(
      abi.encodePacked(
        eventIdToEvent[_eventId].name, ',', eventIdToEvent[_eventId].year
      ));
  }
}
