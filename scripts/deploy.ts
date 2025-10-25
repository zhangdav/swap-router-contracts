import { ethers } from "hardhat";

const factoryV2 = "0x20707616bF84EccFe4a02e6FC78c27D474F4A0cC";
const factoryV3 = "0x7074622D0f93780fE091E54f6f6663B0988C3f14";
const positionManager = "0x3a8A4624fE3D97C2698c27c67B45f65439F3c506";
const WETH = "0xa546f28D23119D9cDD10F54f4c1E9a7E8D622F1f";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(balance));

  // Deploy SwapRouter02
  const SwapRouter02 = await ethers.getContractFactory("SwapRouter02");
  const router = await SwapRouter02.deploy(factoryV2, factoryV3, positionManager, WETH);
  await router.deployed();
  console.log("SwapRouter02 deployed to:", router.address);
}

/* Verify contracts

*  SwapRouter02 (factoryV2, factoryV3, positionManager, WETH)
*  npx hardhat okverify --network xlayerTest \
*     --contract contracts/SwapRouter02.sol:SwapRouter02 \
*     your_swaprouter02_address \
*     --constructor-args scripts/args/router.js
*/


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });