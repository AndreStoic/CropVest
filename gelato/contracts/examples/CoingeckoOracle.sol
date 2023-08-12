// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CoingeckoOracle {
    mapping(uint256 => uint256) public lastUpdated;
    mapping(uint256 => uint256) public price;

    constructor() {}

    function updatePrice(uint256 cropId, uint256 newPrice) external {
        price[cropId] = newPrice;
        lastUpdated[cropId] = block.timestamp;
    }
}
