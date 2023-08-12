// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {CropVault} from "src/CropVault.sol";
import {ERC1155m} from "src/ERC1155m.sol";
import {MockERC20} from "src/MockERC20.sol";
import {CropOracle} from "src/CropOracle.sol";
import {CropBatch} from "src/Structs.sol";
import {console} from "forge-std/console.sol";

contract CropVestDeploy is Script {
    address public deployer;
    CropVault public cropVault;
    ERC1155m public cropCollection;
    CropOracle public cropOracle;
    MockERC20 public erc20;

     modifier broadcaster() {
        vm.startBroadcast(deployer);
        _;
        vm.stopBroadcast();
    }

    function setUp() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        deployer = vm.rememberKey(privateKey);
    }

    function run() public broadcaster {
        erc20 = new MockERC20("USDC", "USDC");
        cropCollection = new ERC1155m("");
        cropOracle = new CropOracle(address(erc20));
        cropVault = new CropVault(
            erc20,
            cropCollection,
            cropOracle,
            "CropVault",
            "CVLT"
        );

        console.log("ERC20", address(erc20));
        console.log("CropCollection", address(cropCollection));
        console.log("CropOracle", address(cropOracle));
        console.log("CropVault", address(cropVault));
    }
}