require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:
  {
    goerli:
    {
      url:"https://eth-goerli.g.alchemy.com/v2/vA2qN092zaaSLNs2qPH-sF2cOlYjz6Lq",
      accounts:["8a4f69299d51bc57c82246e00f914eea83b4719de46c56e3bcbb3aef6d5251f4"]
    }
  }
};
