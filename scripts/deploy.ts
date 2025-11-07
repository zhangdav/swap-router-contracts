import { ethers } from "hardhat";

const factoryV2 = "0x630DB8E822805c82Ca40a54daE02dd5aC31f7fcF";
const factoryV3 = "0xa1415fAe79c4B196d087F02b8aD5a622B8A827E5";
const positionManager = "0xE6b5d25cc857c956bA20B73f4e21a1F1397947d8";
const WETH = "0xe538905cf8410324e03A5A23C1c177a474D59b2b";

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
*     --constructor-args scripts/args/router.ts
*/


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });