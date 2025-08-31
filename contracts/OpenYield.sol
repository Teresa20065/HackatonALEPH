// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IAavePool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
    function getReserveData(address asset) external view returns (
        uint256, uint128, uint128, uint128, uint128,
        uint128, uint40, address aTokenAddress,
        uint40, uint16
    );
}

contract OpenYield is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Org {
        string name;
        address wallet;
        address aToken;
        uint256 totalDeposits;
    }

    IERC20 public immutable USDC;
    IAavePool public immutable aavePool;

    uint256 public orgCount;
    mapping(uint256 => Org) public orgs;
    mapping(uint256 => mapping(address => uint256)) public userDeposits;

    event OrgCreated(uint256 indexed orgId, string name, address wallet, address aToken);
    event Deposited(uint256 indexed orgId, address indexed user, uint256 amount);
    event Withdrawn(uint256 indexed orgId, address indexed user, uint256 amount);
    event Harvested(uint256 indexed orgId, uint256 amount);
    event EmergencyWithdraw(uint256 indexed orgId, uint256 amount);

    constructor(address _usdc, address _aavePool) {
        USDC = IERC20(_usdc);
        aavePool = IAavePool(_aavePool);
    }

    function createOrg(string calldata name, address wallet) external returns (uint256) {
        // ✅ Fix: fetch aToken *before* assigning orgId
        (, , , , , , , address aToken, , ) = aavePool.getReserveData(address(USDC));
        require(aToken != address(0), "INVALID_ATOKEN");

        orgCount++;
        orgs[orgCount] = Org({
            name: name,
            wallet: wallet,
            aToken: aToken,
            totalDeposits: 0
        });

        emit OrgCreated(orgCount, name, wallet, aToken);
        return orgCount;
    }

    function deposit(uint256 orgId, uint256 amount) external nonReentrant {
        require(orgId > 0 && orgId <= orgCount, "INVALID_ORG");
        require(amount > 0, "INVALID_AMOUNT");

        // ✅ Fix: check allowance first
        require(USDC.allowance(msg.sender, address(this)) >= amount, "INSUFFICIENT_ALLOWANCE");

        USDC.safeTransferFrom(msg.sender, address(this), amount);
        USDC.safeIncreaseAllowance(address(aavePool), amount);

        aavePool.supply(address(USDC), amount, address(this), 0);

        userDeposits[orgId][msg.sender] += amount;
        orgs[orgId].totalDeposits += amount;

        emit Deposited(orgId, msg.sender, amount);
    }

    function withdraw(uint256 orgId, uint256 amount, uint256 minAmount) external nonReentrant {
        require(orgId > 0 && orgId <= orgCount, "INVALID_ORG");
        require(amount > 0, "INVALID_AMOUNT");
        require(userDeposits[orgId][msg.sender] >= amount, "INSUFFICIENT_BALANCE");

        userDeposits[orgId][msg.sender] -= amount;
        orgs[orgId].totalDeposits -= amount;

        uint256 withdrawn = aavePool.withdraw(address(USDC), amount, msg.sender);

        // ✅ Slippage check
        require(withdrawn >= minAmount, "SLIPPAGE_EXCEEDED");

        emit Withdrawn(orgId, msg.sender, withdrawn);
    }

    function harvest(uint256 orgId, uint256 amount, uint256 minAmount) external nonReentrant {
        require(orgId > 0 && orgId <= orgCount, "INVALID_ORG");
        require(amount > 0, "INVALID_AMOUNT");

        uint256 withdrawn = aavePool.withdraw(address(USDC), amount, orgs[orgId].wallet);

        // ✅ Slippage check
        require(withdrawn >= minAmount, "SLIPPAGE_EXCEEDED");

        emit Harvested(orgId, withdrawn);
    }

    function emergencyWithdraw(uint256 orgId, uint256 amount, uint256 minAmount) external nonReentrant {
        require(orgId > 0 && orgId <= orgCount, "INVALID_ORG");
        require(amount > 0, "INVALID_AMOUNT");

        uint256 withdrawn = aavePool.withdraw(address(USDC), amount, orgs[orgId].wallet);

        // ✅ Slippage check
        require(withdrawn >= minAmount, "SLIPPAGE_EXCEEDED");

        emit EmergencyWithdraw(orgId, withdrawn);
    }
}
