// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {ICropOracle} from "./interfaces/ICropOracle.sol";
import {ICropVault} from "./interfaces/ICropVault.sol";
import {ERC1155m} from "./ERC1155m.sol";
import {CropBatch} from "src/Structs.sol";


contract CropVault is ICropVault, ERC4626, ERC1155Holder{
    using Math for *;
    using EnumerableSet for *;

    uint256 public constant SENIOR_INVESTOR_THRESHOLD = 0.1e18;

    event CropsWithdrawn(uint256 cropId, uint256 cropAmount, address recipient);
    event SeniorInvestorChanged(address seniorInvestor, bool isSeniorInvestor);

    ERC1155m public immutable cropRegistry;
    ICropOracle public immutable cropOracle;

    EnumerableSet.AddressSet private _seniorInvestors;
    mapping (address farmer => uint256 assets) public loanAmounts;

    modifier onlySeniorInvestor{
        require(_seniorInvestors.contains(msg.sender), "CropVault: only senior investor");
        _;
    }

    constructor(
        ERC20 _asset,
        ERC1155m _cropRegistry,
        ICropOracle _cropOracle,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) {
        cropRegistry = _cropRegistry;
        cropOracle = _cropOracle;
    }

    function loanFunds(address farmer, uint256 assets, CropBatch[] memory crops) external{
        uint256 totalCropValue = 0;
        for(uint256 i = 0; i < crops.length; i++){
            totalCropValue += _quote(crops[i].cropId, crops[i].cropAmount);
        }
        require(totalCropValue >= assets, "CropVault: insufficient collateral");
        loanAmounts[farmer] = assets;
        for(uint256 i = 0; i < crops.length; i++){
            CropBatch memory crop = crops[i];
            cropRegistry.safeTransferFrom(farmer, address(this), crop.cropId, crop.cropAmount, "");
        }
        ERC20(asset()).transfer(farmer, assets);
    }

    function sellCrops(CropBatch[] memory crops, address buyer) external onlySeniorInvestor {
        uint256 totalCropValue = 0;
        for(uint256 i = 0; i < crops.length; i++){
            CropBatch memory crop = crops[i];
            totalCropValue += _quote(crop.cropId, crop.cropAmount);
            cropRegistry.safeTransferFrom(address(this), buyer, crop.cropId, crop.cropAmount, "");
        }
        ERC20(asset()).transferFrom(buyer, address(this), totalCropValue);
    }

    function investorShares(address investor) public view returns(uint256) {
        return _investorShares(investor);
    }

    function seniorInvestors() public view returns(address[] memory) {
        return _seniorInvestors.values();
    }

    function _quote(uint256 cropId, uint256 cropAmount) internal returns(uint256 assets) {
        uint256 cropPrice = cropOracle.price(cropId);
        assets = cropPrice.mulDiv(cropAmount, 1e18);
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        bool isSeniorInvestor = _seniorInvestors.contains(caller);
        super._deposit(caller, receiver, assets, shares);
        if(!isSeniorInvestor && _investorShares(caller) >= SENIOR_INVESTOR_THRESHOLD){
            _seniorInvestors.add(caller);

            emit SeniorInvestorChanged(caller, true);
        }
    }

    function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares) internal override {
        bool isSeniorInvestor = _seniorInvestors.contains(owner);
        super._withdraw(caller, receiver, owner, assets, shares);
        if(isSeniorInvestor && _investorShares(owner) < SENIOR_INVESTOR_THRESHOLD){
            _seniorInvestors.remove(owner);

            emit SeniorInvestorChanged(owner, false);
        }
    }

    function _investorShares(address investor) internal view returns (uint256) {
        return balanceOf(investor).mulDiv(1e18, totalSupply());
    }
}