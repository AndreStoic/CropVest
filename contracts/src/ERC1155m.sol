// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable}  from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IMoleculeController} from "@molecule/v2/interfaces/IMoleculeController.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

// custom errors
error AccountNotAllowedToMint(address minter);
error AccountNotAllowedToBurn(address burner);
error SenderNotAllowedToTransfer(address sender);
error RecipientNotAllowedToReceive(address receipient);
error OwnerNotAllowedToApprove(address owner);

// Molecule ERC1155 token
contract ERC1155m is ERC1155Supply, ERC2771Context, Ownable {
    enum MoleculeType {
        Approve,
        Burn,
        Mint,
        Transfer
    }

    // Base URI for metadata
    string internal _baseURI;

    // Molecule address
    address internal _moleculeApprove;
    address internal _moleculeBurn;
    address internal _moleculeMint;
    address internal _moleculeTransfer;

    event MoleculeUpdated(address molecule, MoleculeType mtype);
    event BaseUriUpdated(string baseURI);

    constructor(string memory baseURI, address trustedForwarder) 
        ERC1155("") 
        ERC2771Context(trustedForwarder) 
    {
        setBaseURI(baseURI);
    }

    // Set base URI for metadata, needed for displaying correctly on OpenSea
    function uri(
        uint256 id
    ) public view virtual override returns (string memory) {
        return string.concat(_baseURI, Strings.toString(id), ".json");
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        if (_moleculeMint != address(0)) {
            if (!IMoleculeController(_moleculeMint).check(account)) {
                revert AccountNotAllowedToMint(account);
            }
        }
        _mint(account, id, amount, data);
    }

    function burn(address account, uint256 id, uint256 amount) external {
        if (_moleculeBurn != address(0)) {
            if (!IMoleculeController(_moleculeBurn).check(account)) {
                revert AccountNotAllowedToBurn(account);
            }
        }
        _burn(account, id, amount);
    }

    // Transfer function: note this is used by all mint/burn/transfer functions
    function _beforeTokenTransfer(
        address operator,
        address sender,
        address recipient,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        if (_moleculeTransfer != address(0)) {
            if (!IMoleculeController(_moleculeTransfer).check(sender)) {
                revert SenderNotAllowedToTransfer(sender);
            }
            if (!IMoleculeController(_moleculeTransfer).check(recipient)) {
                revert RecipientNotAllowedToReceive(recipient);
            }
        }
        super._beforeTokenTransfer(
            operator,
            sender,
            recipient,
            ids,
            amounts,
            data
        );
    }

    // internal approve function
    function _setApprovalForAll(
        address tokenOwner,
        address operator,
        bool approved
    ) internal virtual override {
        if (_moleculeApprove != address(0)) {
            if (!IMoleculeController(_moleculeApprove).check(operator)) {
                revert OwnerNotAllowedToApprove(operator);
            }
        }
        super._setApprovalForAll(tokenOwner, operator, approved);
    }

    // Owner only functions
    // Update molecule address
    function updateMolecule(
        address molecule,
        MoleculeType mtype
    ) external onlyOwner {
        // allows 0x0 address to be set to remove molecule access control
        if (mtype == MoleculeType.Approve) {
            _moleculeApprove = molecule;
        } else if (mtype == MoleculeType.Burn) {
            _moleculeBurn = molecule;
        } else if (mtype == MoleculeType.Mint) {
            _moleculeMint = molecule;
        } else if (mtype == MoleculeType.Transfer) {
            _moleculeTransfer = molecule;
        }
        emit MoleculeUpdated(molecule, mtype);
    }

    // Allow metadata uri to be updated by owner
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseURI = baseURI;
        emit BaseUriUpdated(baseURI);
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            /// @solidity memory-safe-assembly
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20];
        } else {
            return super._msgData();
        }
    }
}