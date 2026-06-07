import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

export default defineConfig({
  plugins: [
    hardhatEthers,
    hardhatToolboxMochaEthers,
  ],

  solidity: {
    version: "0.8.20",
  },
});