// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICropOracle {
    function quoteAsset() external view returns(address);

    function price(uint256 cropId) external view returns(uint256);

    function updatePrice(uint256 cropId, uint256 price) external;

    function lastUpdated(uint256 cropId) external returns(uint256);
}