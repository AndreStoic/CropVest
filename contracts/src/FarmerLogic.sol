// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {MoleculeLogicList} from "@molecule/v2/MoleculeLogicList.sol";


contract FarmerLogic is MoleculeLogicList{
    constructor() MoleculeLogicList("Farmer allowlist", true){}

    function add(address farmer) external onlyOwner {
        _list[farmer] = true;
    }

    function remove(address farmer) external onlyOwner {
        _list[farmer] = false;
    }
}