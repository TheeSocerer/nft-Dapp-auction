// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract contractERC1155 is ERC1155 {
    uint256 public constant SHARES = 1;
    uint256 public constant BOND = 2;    constructor() ERC1155("ipfs://Qmd6y1SDEqSUz4kDxatUbVtLKGzvBKvod8XnMYeX1WgwZj/{id}.json"){    }
    
    
    function mintBond() external {
    _mint(msg.sender, BOND, 1, "");
    }
    function mintBondShares(address to, uint256 amount) external {
        _mint(to, SHARES, amount, "");
    }
}