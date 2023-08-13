// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test} from "forge-std/Test.sol";
import {CropVault} from "src/CropVault.sol";
import {ERC1155m} from "src/ERC1155m.sol";
import {MockERC20} from "src/MockERC20.sol";
import {CropOracle} from "src/CropOracle.sol";
import {CropBatch} from "src/Structs.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract CropVaultTest is Test {
    using Math for *;

    CropVault public cropVault;
    ERC1155m public cropCollection;
    CropOracle public cropOracle;
    MockERC20 public erc20;

    address public farmer;
    address public investor;
    address public admin;

    function setUp() public{
        farmer = makeAddr("farmer");
        investor = makeAddr("investor");
        admin = makeAddr("admin");
        vm.startPrank(admin);

        erc20 = new MockERC20("USDC", "USDC");
        cropCollection = new ERC1155m("", address(this));
        cropOracle = new CropOracle(address(erc20));
        cropVault = new CropVault(
            erc20,
            cropCollection,
            cropOracle,
            "CropVault",
            "CVLT"
        );
    }

    function test_Investor_DepositsAssets(uint256 assets) public {
        vm.assume(assets != 0);
        erc20.mint(investor, assets);
        vm.startPrank(investor);
        erc20.approve(address(cropVault), assets);
        cropVault.deposit(assets, investor);

        assertEq(cropVault.balanceOf(investor), assets);
        assertEq(cropVault.investorShares(investor), 1e18);
    }

    function test_Farmer_LoansFunds(uint256 cropId) public {
        uint256 assets = 2e18;
        uint256 cropAmount = 1e18;

        changePrank(investor);
        erc20.mint(investor, assets);
        erc20.approve(address(cropVault), assets);
        cropVault.deposit(assets, investor);
        
        changePrank(admin);
        uint256 cropPrice = 1e18;
        cropOracle.updatePrice(cropId, cropPrice);

        changePrank(farmer);
        cropCollection.mint(farmer, cropId, cropAmount, "");
        cropCollection.setApprovalForAll(address(cropVault), true);

        uint256 assetsToBorrow = 0.8e18;
        CropBatch[] memory crops = new CropBatch[](1);
        crops[0] = CropBatch(cropId, cropAmount);
        cropVault.loanFunds(farmer, assetsToBorrow, crops);
    }

}