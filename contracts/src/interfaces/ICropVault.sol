// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CropBatch} from "src/Structs.sol";

interface ICropVault {
   
    function loanFunds(address farmer, uint256 amount, CropBatch[] memory crops) external;

    function sellCrops(CropBatch[] memory crops, address buyer) external;
}