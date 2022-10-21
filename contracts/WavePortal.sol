//SPDX-License-Identifier:GPL
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    uint private seed;
    struct waves {
        string message;
        address sender;
        uint256 timestamp;
    }
    waves[] wavers;
    event NewWave(address from, string message, uint time);

    constructor() payable {
        console.log("Hey This is Smart contract");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        totalWaves = totalWaves + 1;
        wavers.push(waves(_message, msg.sender, block.timestamp));
        emit NewWave(msg.sender, _message, block.timestamp);
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);
        if (seed < 50) {
            console.log("%s won!", msg.sender);
        }

        uint prizeamount=0.01 ether;
        require(address(this).balance>prizeamount,"No Sufficient Funds");
        (bool success,)=(msg.sender).call{value:prizeamount}("");
        require(success,"Failed to Withdraw Funds");
        console.log("%s is the waver", msg.sender);
    }

    function getAllWaves() public view returns (waves[] memory) {
        return wavers;
    }

    function getTotalWaves() public view returns (uint) {
        console.log("Literally we have %d waves! ", totalWaves);
        return totalWaves;
    }
}
//0x5FbDB2315678afecb367f032d93F642f64180aa3