// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ICropOracle} from "./interfaces/ICropOracle.sol";

contract CropOracle is ICropOracle, Ownable {
    address public immutable quoteAsset;
    mapping(uint256 cropId => uint256 timestamp) public lastUpdated; 
    mapping(uint256 cropId => uint256 price) public price;

    constructor(address quoteAsset_){
        quoteAsset = quoteAsset_;
    }

    function updatePrice(uint256 cropId, uint256 newPrice) external onlyOwner{
        price[cropId] = newPrice;
        lastUpdated[cropId] = block.timestamp;
    }

    function updatePrices(uint256[] memory cropIds, uint256[] memory newPrices) external onlyOwner{
        require(cropIds.length == newPrices.length, "CropOracle: cropIds and newPrices length mismatch");
        for(uint256 i = 0; i < cropIds.length; i++){
            price[cropIds[i]] = newPrices[i];
            lastUpdated[cropIds[i]] = block.timestamp;
        }
    }
}